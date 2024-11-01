Table player { 
  id smallint [pk, increment]
  team smallint [ref: > team.id]
  fullname varchar (255)
  number varchar (16)
  birthdate varchar (50)
  createdAt timestampz
  updatedAt timestampaz
}

Table team {
  id smallint [pk, increment]
  name varchar (255)
  country varchar (255)
  founded varchar (16)
  stadium varchar (524)
  createdAt timestampz
  updatedAt timestampaz

}

Table game {
  id smallint [pk, increment]
  competition varchar (255)
  name varchar (255)
  home smallint [ref: > team.id]
  visited smallint [ref: > team.id]
  stadium varchar (524)
  scoreHome smallint
  scoreVisited smallint
  schedule date
  createdAt timestampz
  updatedAt timestampaz

}

Table lineUp {
  game smallint [ref: > game.id]
  playerHome smallint [ref: > player.id]
  playerVisited smallint [ref: > player.id]
  team smallint [ref: > team.id]
  substitutes boolean
  createdAt timestampz
  updatedAt timestampaz

}

Table statistics {
  game smallint [ref: > game.id]

  homeShotsTotal smallint
  visitedShotsTotal smallint

  homeShotsOnGoal smallint
  visitedShotsOnGoal smallint

  homeShotsOffGoal smallint
  visitedShotsOffGoal smallint

  homeFouls smallint
  visitedFouls smallint

  homeCorners smallint
  visitedCorners smallint

  homeBallPossession smallint
  visitedBallPossession smallint

  homeYellowCards smallint
  visitedYellowCards smallint

  homePenaltis smallint
  visitedPenaltis smallint

  createdAt timestampz
  updatedAt timestampaz

}

