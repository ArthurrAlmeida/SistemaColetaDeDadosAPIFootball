With Estatisticas_Casa_Fora_Times AS

(SELECT 
    te.id AS team_id, 
    te.name AS team_name,

    COALESCE(SUM(CASE WHEN te.id = ga.home THEN st."homeShotsTotal" ELSE 0 END), 0) AS home_shots_total,
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN st."visitedShotsTotal" ELSE 0 END), 0) AS visited_shots_total,

    COALESCE(SUM(CASE WHEN te.id = ga.home THEN st."homeShotsOnGoal" ELSE 0 END), 0) AS home_shots_on_goal,
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN st."visitedShotsOnGoal" ELSE 0 END), 0) AS visited_shots_on_goal,

    COALESCE(SUM(CASE WHEN te.id = ga.home THEN st."homeShotsOffGoal" ELSE 0 END), 0) AS home_shots_off_goal,
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN st."visitedShotsOffGoal" ELSE 0 END), 0) AS visited_shots_off_goal,

    COALESCE(SUM(CASE WHEN te.id = ga.home THEN st."homeFouls" ELSE 0 END), 0) AS home_fouls,
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN st."visitedFouls" ELSE 0 END), 0) AS visited_fouls,

    COALESCE(SUM(CASE WHEN te.id = ga.home THEN st."homeCorners" ELSE 0 END), 0) AS home_corners,
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN st."visitedCorners" ELSE 0 END), 0) AS visited_corners,

    COALESCE(SUM(CASE WHEN te.id = ga.home THEN st."homeBallPossession" ELSE 0 END), 0) AS home_ball_possession,
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN st."visitedBallPossession" ELSE 0 END), 0) AS visited_ball_possession,

    COALESCE(SUM(CASE WHEN te.id = ga.home THEN st."homeYellowCards" ELSE 0 END), 0) AS home_yellow_cards,
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN st."visitedYellowCards" ELSE 0 END), 0) AS visited_yellow_cards,

    COALESCE(SUM(CASE WHEN te.id = ga.home THEN st."homePenalty" ELSE 0 END), 0) AS home_penalties,
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN st."visitedPenalty" ELSE 0 END), 0) AS visited_penalties

FROM public.team AS te
JOIN public.game AS ga
    ON te.id = ga.home OR te.id = ga.visited  
JOIN public.statistics AS st
    ON ga.id = st.game                                              
GROUP BY te.id, te.name
ORDER BY te.id;)
