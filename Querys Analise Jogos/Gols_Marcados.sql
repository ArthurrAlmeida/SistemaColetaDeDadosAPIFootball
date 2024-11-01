With Gols_Marcados AS
(SELECT te.id, te.name, 
       COALESCE(SUM(ga."scoreHome"), 0) AS total_gols_home,
       COALESCE(SUM(ga."scoreVisited"), 0) AS total_gols_visited,
       COALESCE(SUM(ga."scoreHome"), 0) + COALESCE(SUM(ga."scoreVisited"), 0) AS total_gols
FROM public.team AS te
LEFT JOIN public.game AS ga
    ON te.id = ga.home OR te.id = ga.visited
GROUP BY te.id, te.name
ORDER BY total_gols DESC);

