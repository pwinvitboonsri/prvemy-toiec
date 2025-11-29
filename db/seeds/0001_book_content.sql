DO $$
DECLARE
    v_book_id UUID;
    v_part_1_id UUID;
    v_part_5_id UUID;
    v_part_7_id UUID;
    v_group_id UUID;
BEGIN
    -- 1. Create the BOOK (Guest Accessible)
    INSERT INTO books (title, description, is_active, is_guest_accessible, cover_image_url, one_time_price_id)
    VALUES (
        'ETS Simulation Test 1 (Free)', 
        'A full-length simulation to test your guest mode and UI layouts.', 
        true, 
        true, 
        'https://placehold.co/600x400/2563eb/white?text=TOEIC+Test+1',
        'price_free_tier' 
    ) RETURNING id INTO v_book_id;

    -- 2. Create PARTS
    INSERT INTO parts (book_id, part_number, title, instructions)
    VALUES (v_book_id, 1, 'Photographs', 'For each question in this part, you will hear four statements about a picture in your test book. When you hear the statements, you must select the one statement that best describes what you see in the picture.')
    RETURNING id INTO v_part_1_id;

    INSERT INTO parts (book_id, part_number, title, instructions)
    VALUES (v_book_id, 5, 'Incomplete Sentences', 'A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.')
    RETURNING id INTO v_part_5_id;
    
    INSERT INTO parts (book_id, part_number, title, instructions)
    VALUES (v_book_id, 7, 'Reading Comprehension', 'In this part you will read a selection of texts, such as magazine and newspaper articles, e-mails, and instant messages. Each text or set of texts is followed by several questions. Select the best answer for each question.')
    RETURNING id INTO v_part_7_id;

    -- ---------------------------------------------------------
    -- PART 1 CONTENT (One Image, One Question)
    -- ---------------------------------------------------------
    
    -- Create Group (The Image Holder)
    INSERT INTO question_groups (part_id, image_url, audio_url, order_index)
    VALUES (
        v_part_1_id, 
        'https://placehold.co/600x400/orange/white?text=Part+1+Image', 
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
        1
    ) RETURNING id INTO v_group_id;

    -- Create Question
    INSERT INTO questions (group_id, correct_option, option_a, option_b, option_c, option_d, explanation, order_index, ai_metadata)
    VALUES (
        v_group_id, 
        'A',
        'The woman is typing on a keyboard.',
        'The woman is drinking coffee.',
        'The screen is blank.',
        'There are no chairs in the room.',
        'The image clearly shows hands on a keyboard (Option A).',
        1,
        '{"difficulty": "easy", "tags": ["vocabulary", "office"]}'::jsonb
    );

    -- ---------------------------------------------------------
    -- PART 5 CONTENT (Grammar - No Image/Audio)
    -- ---------------------------------------------------------
    
    -- Create Group (Empty wrapper for Part 5)
    INSERT INTO question_groups (part_id, order_index)
    VALUES (v_part_5_id, 1) RETURNING id INTO v_group_id;

    -- Create Question
    INSERT INTO questions (group_id, question_text, correct_option, option_a, option_b, option_c, option_d, explanation, order_index, ai_metadata)
    VALUES (
        v_group_id, 
        'Mr. Tanaka _______ the proposal before the meeting started.',
        'B',
        'review',
        'reviewed',
        'reviewing',
        'reviews',
        'We need the past tense "reviewed" because the action happened before the meeting started.',
        1,
        '{"difficulty": "medium", "tags": ["grammar", "verb-tense"]}'::jsonb
    );

    -- ---------------------------------------------------------
    -- PART 7 CONTENT (Reading Passage + 2 Questions)
    -- ---------------------------------------------------------
    
    -- Create Group (The Email Passage)
    INSERT INTO question_groups (part_id, passage_text, order_index)
    VALUES (
        v_part_7_id, 
        'FROM: Office Management\nTO: All Staff\nSUBJECT: Coffee Machine\n\nPlease be advised that the coffee machine on the 3rd floor is currently under repair. A technician is scheduled to arrive tomorrow morning at 9:00 AM. In the meantime, please use the machine in the break room on the 2nd floor.\n\nThank you for your patience.', 
        1
    ) RETURNING id INTO v_group_id;

    -- Question 1 for this passage
    INSERT INTO questions (group_id, question_text, correct_option, option_a, option_b, option_c, option_d, order_index)
    VALUES (
        v_group_id, 
        'What is the problem mentioned in the email?',
        'C',
        'The office is closing early.',
        'There is no coffee left.',
        'A machine is broken.',
        'The technician is late.',
        1
    );

    -- Question 2 for this passage
    INSERT INTO questions (group_id, question_text, correct_option, option_a, option_b, option_c, option_d, order_index)
    VALUES (
        v_group_id, 
        'When will the technician arrive?',
        'B',
        'Today at 5:00 PM',
        'Tomorrow morning',
        'Next week',
        'Immediately',
        2
    );

END $$;