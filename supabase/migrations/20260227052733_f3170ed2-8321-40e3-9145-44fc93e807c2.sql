CREATE POLICY "Deny public read access" ON quotes FOR SELECT USING (false);
CREATE POLICY "Deny public updates" ON quotes FOR UPDATE USING (false);
CREATE POLICY "Deny public deletes" ON quotes FOR DELETE USING (false);