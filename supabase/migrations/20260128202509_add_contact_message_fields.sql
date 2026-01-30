/*
  # Add contact message fields to contact_submissions table

  1. Changes
    - Add `name` column (text) - Name from the contact form
    - Add `subject` column (text) - Subject/topic of the message
    - Add `message` column (text) - The actual message content
    - Add `email_sent` column (boolean) - Whether email was successfully sent
    - Add `email_error` column (text) - Error message if email failed
  
  2. Purpose
    - Store complete contact form submissions in database
    - Track email delivery status independently
    - Allow manual follow-up if email sending fails
    - Ensure no contact messages are lost
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'name'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'subject'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN subject text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'message'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN message text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'email_sent'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN email_sent boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'email_error'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN email_error text;
  END IF;
END $$;