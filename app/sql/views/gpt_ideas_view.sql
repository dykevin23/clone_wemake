CREATE OR REPLACE VIEW gpt_ideas_view AS
SELECT
    gpt_ideas.gpt_idea_id,
    CASE WHEN gpt_ideas.claimed_at IS NULL THEN gpt_ideas.idea ELSE 'ClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimed' END AS idea,
    gpt_ideas.views,
    CASE WHEN gpt_ideas.claimed_at IS NULL THEN FALSE ELSE TRUE END AS is_claimed,
    COUNT(gpt_ideas_likes.gpt_idea_id) AS likes,
    gpt_ideas.created_at
FROM gpt_ideas
LEFT JOIN public.gpt_ideas_likes USING (gpt_idea_id)
GROUP BY gpt_ideas.gpt_idea_id

SELECT * from gpt_ideas_view