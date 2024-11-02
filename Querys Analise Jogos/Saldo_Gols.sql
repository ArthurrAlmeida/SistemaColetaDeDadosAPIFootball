SELECT 
    te.id, 
    te.name, 
    COALESCE(SUM(ga."scoreHome"), 0) AS total_gols_home,
    COALESCE(SUM(ga."scoreVisited"), 0) AS total_gols_visited,
    COALESCE(SUM(ga."scoreHome"), 0) + COALESCE(SUM(ga."scoreVisited"), 0) AS total_gols,
    COALESCE(SUM(CASE WHEN te.id = ga.home THEN ga."scoreVisited" END), 0) AS gols_sofridos_como_home,
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN ga."scoreHome" END), 0) AS gols_sofridos_como_visited,
    COALESCE(SUM(CASE WHEN te.id = ga.home THEN ga."scoreVisited" END), 0) +
    COALESCE(SUM(CASE WHEN te.id = ga.visited THEN ga."scoreHome" END), 0) AS total_gols_sofridos,
    (COALESCE(SUM(ga."scoreHome"), 0) + COALESCE(SUM(ga."scoreVisited"), 0)) -
    (COALESCE(SUM(CASE WHEN te.id = ga.home THEN ga."scoreVisited" END), 0) +
     COALESCE(SUM(CASE WHEN te.id = ga.visited THEN ga."scoreHome" END), 0)) AS saldo_gols
FROM 
    public.team AS te
LEFT JOIN 
    public.game AS ga ON te.id = ga.home OR te.id = ga.visited
GROUP BY 
    te.id, te.name
ORDER BY 
    saldo_gols DESC;
