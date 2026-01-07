import { createClient } from "@/lib/supabase/server";
import { BookLibraryClient } from "@/Components/page/books/library/BookLibraryClient";
import { LibraryBook, AccessType, UserRole } from "@/types/data/library_data";
import { getUserWithProfile } from "@/lib/auth/getUserProfile";

type DBBook = {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  is_guest_accessible: boolean;
  early_access_until: string | null;
  one_time_price_id: string | null;
  category?: string;
  is_active: boolean; // Added type definition
};

// Define shape for custom user profile return
type CustomUser = {
  id: string;
  email?: string;
  subscription_tier?: string;
  subscription_status?: string;
};

export default async function LibraryPage() {
  const supabase = await createClient();

  // 1. Get User
  const rawUser = await getUserWithProfile();
  const user = rawUser as unknown as CustomUser | null;

  let currentUserRole: UserRole = "guest";

  if (user) {
    // Determine role based on subscription
    const tier = user.subscription_tier;
    if (user.subscription_status === "active") {
      if (tier === "platinum") currentUserRole = "platinum";
      else if (["silver", "gold", "premium"].includes(tier || ""))
        currentUserRole = "premium";
      else currentUserRole = "free";
    } else {
      currentUserRole = "free";
    }
  }

  // 3. Fetch Books (Only Active)
  const { data: booksData } = await supabase
    .from("books")
    .select("*")
    .eq("is_active", true) // Filter for active books only
    .order("title", { ascending: true });

  const books = (booksData as DBBook[]) || [];

  // 4. Fetch Purchases
  const ownedBookIds = new Set<string>();
  if (user) {
    const { data: purchases } = await supabase
      .from("user_purchases")
      .select("book_id")
      .eq("user_id", user.id);
    purchases?.forEach((p) => ownedBookIds.add(p.book_id));
  }

  // 5. Map Data
  const mappedBooks: LibraryBook[] = books.map((book) => {
    // Dates
    const now = new Date();
    const earlyAccessDate = book.early_access_until
      ? new Date(book.early_access_until)
      : null;
    const isEarlyAccessPeriod = earlyAccessDate ? earlyAccessDate > now : false;

    // -- Access Determination --
    let access: AccessType = "free";

    // A. Early Access (Highest Priority Restriction)
    if (isEarlyAccessPeriod) {
      // Only Platinum can access this.
      access = "premium";
    }
    // B. Guest / Free Tier
    else if (
      book.one_time_price_id === "price_free_tier" ||
      book.is_guest_accessible
    ) {
      access = "guest";
    }
    // C. One-Time Purchase Book (Not Free)
    else if (
      book.one_time_price_id &&
      book.one_time_price_id !== "price_free_tier"
    ) {
      access = "one-time";
    }
    // D. Standard Premium Content (No price id, not guest)
    else {
      access = "premium";
    }

    // -- Visuals --
    let category: "ETS" | "VOCAB" | "GRAMMAR" | "BIZ" = "ETS";
    let coverColor = "bg-[#2d3e75]";
    let coverText = "00";
    const upperTitle = book.title.toUpperCase();

    if (upperTitle.includes("VOCAB")) {
      category = "VOCAB";
      coverColor = "bg-white";
      coverText = "VOC";
    } else if (upperTitle.includes("GRAMMAR")) {
      category = "GRAMMAR";
      coverColor = "bg-white";
      coverText = "GRM";
    } else if (upperTitle.includes("BIZ")) {
      category = "BIZ";
      coverColor = "bg-[#1a1a1a]";
      coverText = "BIZ";
    } else {
      category = "ETS";
      const match = book.title.match(/\d+/);
      coverText = match ? match[0].padStart(2, "0") : "ETS";
      if (access === "premium" || access === "one-time")
        coverColor = "bg-[#d13a3a]";
    }

    // Tab Label
    let tabLabel = "Standard";
    if (isEarlyAccessPeriod) tabLabel = "Early Access";
    else if (access === "guest") tabLabel = "Open Access";
    else if (access === "premium") tabLabel = "Premium";
    else if (access === "one-time") tabLabel = "Store";

    // Ownership Override for UI (Optional)
    if (ownedBookIds.has(book.id)) {
      if (access === "one-time") access = "free";
    }

    return {
      id: book.id,
      title: book.title,
      subtitle: book.description || "Toeic Simulation Test",
      category,
      access,
      isEarlyAccess: isEarlyAccessPeriod,
      releaseDate: earlyAccessDate?.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      coverColor,
      coverText,
      tabLabel,
      questionCount: 200,
    };
  });

  return (
    <BookLibraryClient
      initialBooks={mappedBooks}
      currentUserRole={currentUserRole}
    />
  );
}
