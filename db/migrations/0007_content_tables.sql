-- --------------------------------------------------------
-- 1. CONTENT HIERARCHY & FLEXIBLE ACCESS
-- --------------------------------------------------------

CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT false,
    cover_image_url TEXT,
    
    -- ACCESS STRATEGY: 
    -- 1. Guest: Simple Toggle
    is_guest_accessible BOOLEAN DEFAULT false,
    
    -- 2. Time-Based Access (The "Netflix Strategy"):
    -- Date in future = Only Top Tiers (Early Access).
    -- Date in past = Standard Tiers.
    early_access_until TIMESTAMPTZ,
    
    -- 3. Commerce:
    one_time_price_id TEXT, 
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    part_number INTEGER NOT NULL CHECK (part_number BETWEEN 1 AND 7),
    title TEXT NOT NULL,
    instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE question_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    part_id UUID REFERENCES parts(id) ON DELETE CASCADE,
    
    passage_text TEXT,        -- Part 6, 7
    audio_url TEXT,           -- Part 1-4
    image_url TEXT,           -- Part 1
    transcript_text TEXT,     -- For Review Mode (Vocabulary clicking)
    
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES question_groups(id) ON DELETE CASCADE,
    
    question_text TEXT,       
    correct_option CHAR(1) CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    
    option_a TEXT,
    option_b TEXT,
    option_c TEXT,
    option_d TEXT,
    explanation TEXT,
    
    -- FLEXIBILITY SLOT: 
    -- Store tags, difficulty, or new AI parameters here without DB migration.
    ai_metadata JSONB DEFAULT '{}'::jsonb, 
    
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- --------------------------------------------------------
-- 2. COMMERCE (THAI BAHT DEFAULT)
-- --------------------------------------------------------

CREATE TABLE user_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    
    payment_provider TEXT, 
    payment_id TEXT,       
    amount_paid INTEGER,   -- Store in Satang (e.g. 100 baht = 10000)
    currency TEXT DEFAULT 'THB', -- Default to Thai Baht
    purchased_at TIMESTAMPTZ DEFAULT now(),
    
    UNIQUE(user_id, book_id)
);

-- --------------------------------------------------------
-- 3. SESSIONS & ANALYTICS
-- --------------------------------------------------------

CREATE TABLE exam_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- Nullable for Guests
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    
    status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    
    -- THE ULTIMATE FLEXIBILITY COLUMN:
    -- Store user-specific toggles here (e.g., {"speed": 1.5, "show_hints": true})
    settings JSONB NOT NULL DEFAULT '{}'::jsonb, 
    
    ai_coaching_report JSONB,
    
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    
    score_listening INTEGER DEFAULT 0,
    score_reading INTEGER DEFAULT 0,
    total_score INTEGER DEFAULT 0
);

CREATE TABLE user_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES exam_sessions(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    
    selected_option CHAR(1),
    is_correct BOOLEAN DEFAULT false,
    
    is_guessed BOOLEAN DEFAULT false,
    is_flagged BOOLEAN DEFAULT false,
    time_taken_ms INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT now()
);

-- --------------------------------------------------------
-- 4. VOCABULARY
-- --------------------------------------------------------

CREATE TABLE user_vocabulary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    word TEXT NOT NULL,
    context_sentence TEXT,
    source_type TEXT,
    mastery_level INTEGER DEFAULT 0,
    next_review_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- --------------------------------------------------------
-- 5. INDICES & SECURITY
-- --------------------------------------------------------

CREATE INDEX idx_parts_book ON parts(book_id);
CREATE INDEX idx_groups_part ON question_groups(part_id);
CREATE INDEX idx_questions_group ON questions(group_id);
CREATE INDEX idx_responses_session ON user_responses(session_id);
CREATE INDEX idx_vocab_user ON user_vocabulary(user_id);
CREATE INDEX idx_questions_ai ON questions USING gin (ai_metadata);
CREATE INDEX idx_purchases_user ON user_purchases(user_id);
CREATE INDEX idx_books_early_access ON books(early_access_until); 

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_vocabulary ENABLE ROW LEVEL SECURITY;

-- POLICIES

-- Content is mostly public (read-only)
CREATE POLICY "Public read books" ON books FOR SELECT USING (true);
CREATE POLICY "Public read parts" ON parts FOR SELECT USING (true);
CREATE POLICY "Public read groups" ON question_groups FOR SELECT USING (true);
CREATE POLICY "Public read questions" ON questions FOR SELECT USING (true);

-- User Data is private
CREATE POLICY "Users view own purchases" ON user_purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own purchases" ON user_purchases FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone create session" ON exam_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Users read own sessions" ON exam_sessions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone create response" ON user_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Users read own responses" ON user_responses FOR SELECT USING (
    EXISTS (SELECT 1 FROM exam_sessions s WHERE s.id = session_id AND s.user_id = auth.uid())
);

CREATE POLICY "Users manage vocabulary" ON user_vocabulary FOR ALL USING (auth.uid() = user_id);