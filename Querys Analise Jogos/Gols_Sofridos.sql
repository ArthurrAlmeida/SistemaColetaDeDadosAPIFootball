With Gols_Sofridos AS
(SELECT te.id, te.name, 
       COALESCE(SUM(CASE WHEN te.id = ga.home THEN ga."scoreVisited" END), 0) AS gols_sofridos_como_home,
       COALESCE(SUM(CASE WHEN te.id = ga.visited THEN ga."scoreHome" END), 0) AS gols_sofridos_como_visited,
       COALESCE(SUM(CASE WHEN te.id = ga.home THEN ga."scoreVisited" END), 0) +
       COALESCE(SUM(CASE WHEN te.id = ga.visited THEN ga."scoreHome" END), 0) AS total_gols_sofridos
FROM public.team AS te
LEFT JOIN public.game AS ga
    ON te.id = ga.home OR te.id = ga.visited
GROUP BY te.id, te.name
ORDER BY total_gols_sofridos DESC);
