# System Constants & Variables Manual

## 1. Monetization (Books Table)
| Variable Name | Value in DB | Description |
| :--- | :--- | :--- |
| **Free Tier Price** | `'price_free_tier'` | Placeholder ID. Use this for books that are "Purchasable" for $0 (Free). |
| **Basic Price** | `'price_basic_199'` | Example ID for a 199 THB book. Corresponds to Stripe/Omise ID. |
| **Pro Bundle** | `'price_bundle_999'` | Example ID for a full pack. |

## 2. Subscription Tiers (Tiers Logic)
| Level | Meaning | Privileges |
| :--- | :--- | :--- |
| **0** | **Guest / Free** | Can only access books with `is_guest_accessible = true`. |
| **1** | **Standard Sub** | Access to all "Past" books. No Early Access. |
| **2** | **Premium Sub** | Access to Early Access books + AI Features. |

## 3. Exam Session Status
| Status Code | Meaning |
| :--- | :--- |
| `'in_progress'` | User is currently taking the test. Timer is running. |
| `'completed'` | User finished and submitted. Score is finalized. |
| `'abandoned'` | User closed the browser and never returned. |

## 4. Part Numbers (TOEIC Standard)
| Part ID | Name | Type |
| :--- | :--- | :--- |
| `1` | Photographs | Listening (Image + Audio) |
| `2` | Question-Response | Listening (Audio Only) |
| `3` | Conversations | Listening (Audio + Group Questions) |
| `4` | Talks | Listening (Audio + Group Questions) |
| `5` | Incomplete Sentences | Reading (Grammar) |
| `6` | Text Completion | Reading (Passage Completion) |
| `7` | Reading Comprehension | Reading (Passages) |