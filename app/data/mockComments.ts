// Topic-specific mock data
export const TOPIC_MOCK_DATA = {
  'masters-2025': {
    usernames: [
      'GolfFanatic_78', 'BirdieMaster',"Rorloyalist", 'EagleEye', 'FairwayKing', 'PuttPerfect',
      'GreenJacket', 'IronShot', 'ChipAndRun', 'BunkerBuster', 'TeeTimeHero',
      'RyderRocker', 'TourPro2025',
    ],
    messages: [
      'What a shot!',
      'This is unbelievable golf',
      'Never seen anything like it',
      'That putt was absolutely clutch',
      'He is on fire today!',
      'The crowd is going wild',
      'Best round of the tournament so far',
      'That eagle just changed everything',
      'Incredible composure under pressure',
      'This is why we watch golf',
      'Historic performance right here',
      'The leaderboard is shaking up',
      'What a comeback story',
      'That chip-in was pure magic',
    ],
    initialComments: [
      {
        username: 'GolfFanatic_78',
        avatarUrl: '/GolfFanatic_78.png',
        message: "It's gotta happen soon, right?. 🤔 He's too talented to only have 4. But the competition is just so deep now..",
        reactions: {
          '👍': 35,
          '💯': 35,
        }
      },
      {
        username: 'Rorloyalist', 
        avatarUrl: '/Roryloyalist.png',
        message: "Pressure, maybe? The weight of expectation has to be immense. Everyone's always talking about him winning another major 😉",
        reactions: {}
      },
      {
        username: 'MajorMadness',
        avatarUrl: '/MajorMadness.png',
        message: "That Open Championship at Hoylake in '14 feels like ages ago. He looked unstoppable then, what changed? 😭😭" ,
        reactions: {
          '👍': 35,
          '❤️': 35,
          '👏': 35,
        }
      },
      {
        username: 'Analytical_Golfer',
        avatarUrl: '/Analytical_Golfer.png',
        message: "Statistically, his approach play still ranks high, but his putting in the majors lately has been.. 😬 you can't afford that against the best.",
        reactions: {
          '👍': 3,
          '✨': 2,
        }
      },
    ],
  },
  'ryder-cup': {
    usernames: [
      'TeamEuropeFan', 'USA_Golfer23', 'RyderCupLegend', 'CaptainAmerica', 'EuroStar2025',
      'GolfPatriot', 'ContinentalKing', 'AtlanticWarrior', 'RyderVeteran', 'CupChampion',
      'TeamSpirit99', 'GolfDiplomat',
    ],
    messages: [
      'Europe is looking strong this year!',
      'USA needs to step it up',
      'Ryder Cup vibes all day long',
      'This is what golf is all about',
      'The pressure is immense',
      'Captain made the right call',
      'This match is electric',
      'History in the making',
      'The crowd is the 13th man',
      'Pure golf drama right here',
      'This is why the Ryder Cup is special',
      'Incredible sportsmanship',
      'The atmosphere is electric',
      'This is going down to the wire',
      'What a strategic move by the captain',
    ],
    initialComments: [
      {
        username: 'TeamEuropeFan',
        message: 'Europe has been dominating the singles matches. The team chemistry is incredible!'
      },
      {
        username: 'USA_Golfer23',
        message: 'The USA needs to step it up in these final few matches. We can still pull this off!'
      },
      {
        username: 'RyderCupLegend',
        message: 'This is exactly what makes the Ryder Cup special. Every point matters so much.'
      },
      {
        username: 'CaptainAmerica',
        message: 'The captain made some bold picks this year. Starting to pay off big time.'
      },
    ],
  },
  'pga-tour': {
    usernames: [
      'PGATourFan', 'GolfAnalyst', 'TourInsider', 'FairwayExpert', 'GolfStats2025',
      'ProGolfer22', 'GolfJournalist', 'TourTracker', 'GolfHistorian', 'CourseExpert',
      'GolfCommentator', 'SwingAnalysis',
    ],
    messages: [
      'The state of the game is evolving',
      'Technology is changing golf',
      'Growing the game is crucial',
      'Young talent is incredible',
      'The tour is in good hands',
      'This is great for golf',
      'The future looks bright',
      'Innovation in golf equipment',
      'Course design is getting better',
      'The business side of golf',
      'Media coverage is improving',
      'Fan engagement is key',
      'Global growth is happening',
      'Diversity in golf is improving',
      'The professional game is thriving',
    ],
    initialComments: [
      {
        username: 'GolfAnalyst',
        message: 'The state of professional golf is really interesting right now. Lots of changes happening.'
      },
      {
        username: 'TourInsider',
        message: 'Young talent coming up is incredible. The next generation is going to be special.'
      },
      {
        username: 'PGATourFan',
        message: 'Growing the game globally is so important. Seeing more international players is great.'
      },
      {
        username: 'GolfJournalist',
        message: 'The business side of golf has really evolved. Prize money and sponsorship are at all-time highs.'
      },
    ],
  },
  'liv-golf': {
    usernames: [
      'GolfTraditionalist', 'LIVSupporter', 'GolfAnalyst', 'TourCommissioner', 'GolfFan2025',
      'GolfBusiness', 'GolfMedia', 'ProGolfer', 'GolfHistorian', 'GolfCommentator',
      'GolfExpert', 'GolfInsider',
    ],
    messages: [
      'LIV has fundamentally changed golf',
      'The competition is good for the sport',
      'Players have more options now',
      'The prize money is insane',
      'Team golf is interesting',
      'The format is innovative',
      'This has shaken up the golf world',
      'Traditional golf vs new format',
      'The talent pool is deep',
      'Global golf expansion',
      'Broadcast quality is excellent',
      'Fan experience is better',
      'The rivalry is intense',
      'This is good for players',
      'The sport is evolving',
      'Competition drives excellence',
    ],
    initialComments: [
      {
        username: 'GolfTraditionalist',
        message: 'LIV has fundamentally changed professional golf. The landscape is completely different now.'
      },
      {
        username: 'LIVSupporter',
        message: 'The competition is good for the sport. Players have more options and better earning potential.'
      },
      {
        username: 'GolfAnalyst',
        message: 'The team format is actually really interesting. Adds a new strategic element to golf.'
      },
      {
        username: 'GolfBusiness',
        message: 'The prize money is insane. This has forced traditional tours to step up their game.'
      },
    ],
  },
  'st-andrews': {
    usernames: [
      'LinksGolfer', 'CourseArchitect', 'GolfHistorian', 'ScotsGolfFan', 'OldCourseExpert',
      'GolfPurist', 'LinksSpecialist', 'CourseDesigner', 'GolfScholar', 'TraditionalGolf',
      'GolfArchaeologist', 'StAndrewsPilgrim',
    ],
    messages: [
      'St Andrews is golf heaven',
      'The Old Course is timeless',
      'Links golf is the purest form',
      'The history is incredible',
      'The weather is a factor',
      'The bunkers are legendary',
      'The greens are perfect',
      'This is golf as it should be',
      'The wind is always a challenge',
      'The course condition is superb',
      'Walking these fairways is special',
      'The tradition is palpable',
      'Every hole tells a story',
      'The Swilcan Bridge is iconic',
      'The 18th hole is electric',
      'This is golfing mecca',
    ],
    initialComments: [
      {
        username: 'CourseArchitect',
        message: 'What makes St Andrews special is the natural layout. No hand-placed bunkers, just pure golf.'
      },
      {
        username: 'GolfHistorian',
        message: 'The history here is incredible. You can feel centuries of golf tradition on every hole.'
      },
      {
        username: 'LinksGolfer',
        message: 'Links golf is the purest form of the game. St Andrews is the ultimate test of creativity.'
      },
      {
        username: 'OldCourseExpert',
        message: 'The bunkers here are legendary. They punish bad shots but reward local knowledge.'
      },
    ],
  },
}

// Helper function to get topic-specific mock data
export function getTopicMockData(topicId: string) {
  return TOPIC_MOCK_DATA[topicId as keyof typeof TOPIC_MOCK_DATA] || TOPIC_MOCK_DATA['masters-2025']
}

// Helper function to get initial comments for a topic
export function getInitialComments(topicId: string) {
  const mockData = getTopicMockData(topicId)
  return mockData.initialComments || []
}

// Legacy exports for backward compatibility
export const MOCK_USERNAMES = TOPIC_MOCK_DATA['masters-2025'].usernames
export const MOCK_MESSAGES = TOPIC_MOCK_DATA['masters-2025'].messages
