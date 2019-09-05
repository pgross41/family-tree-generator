// TODO: Update to the new format, this file will not work 

const deg = (degrees) => (Math.PI / 180) * degrees

export default {
    debugMode: false,
    title: "The Ballwin (Brother) Family",
    date: "August 2019",
    treeWidth: "1500px",
    maxAngle: Math.PI * 1.0,
    minThetaBetweenSibs: deg(10),
    bonusParentFactor: 1.5,
    edgeLeafOffset: Math.PI / 30,
    adjustments: {
        "Carmen Gabriela Baldwin": deg(5),
        "Justin Drew Bieber": deg(10),
        "Stephen Andrew Baldwin": deg(-8)
    },
    noBorders: {
        "Alexander Rae Baldwin III": "top",
        "Stephen Andrew Baldwin": "bottom",
        "Justin Drew Bieber": "bottom",
    },
    data: `
name,born,died,spouseName,spouseBorn,parentName
Alexander Rae Baldwin II,"Oct 26, 1927",15-Apr-83,Carol Martineau,"Dec 15, 1929",
Alexander Rae Baldwin III,"Apr 3, 1958",,Kimila Ann Basinger,"Dec 8, 1953",Alexander Rae Baldwin II
Carmen Gabriela Baldwin,"Aug 23, 2013",,,,Alexander Rae Baldwin III
Rafael Thomas Baldwin,"Jun 17, 2015",,,,Alexander Rae Baldwin III
Leonardo Angel Charles Baldwin,"Sep 12, 2016",,,,Alexander Rae Baldwin III
Romeo Alejandro David Baldwin,"May 17, 2018",,,,Alexander Rae Baldwin III
Daniel Leroy Baldwin,"Oct 5, 1960",,Joanne Clare Smith ,1969,Alexander Rae Baldwin II
Avis Ann Baldwin,"Jan 17, 2008",,,,Daniel Leroy Baldwin
Finley Rae Baldwin ,"Aug 7, 2009",,,,Daniel Leroy Baldwin
William Joseph Baldwin,"Feb 21, 1963",, Chynna Gilliam Phillips,"Feb 12, 1968",Alexander Rae Baldwin II
Jameson Baldwin�,2000,,,,William Joseph Baldwin
Vance Baldwin ,2002,,,,William Joseph Baldwin
Brooke Baldwin,2004,,,,William Joseph Baldwin
Stephen Andrew Baldwin,"May 12, 1966",,Hailey Rhode Baldwin ,"Nov 22, 1996",Alexander Rae Baldwin II
Justin Drew Bieber,"Mar 1, 1994",,,,Stephen Andrew Baldwin
    `.trim()
}