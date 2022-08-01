
const cellSize = 800 / 12;

const EntityTypes = {
    START: 0,
    END: 1,
    CRATE: 2,
    BLOCKER: 3,
    HAZARD: 4,
    STEAM: 5,
    PORTAL: 6,
    SPRING: 7,
};

const EntityTypesRef = {
    0: 'start',
    1: 'end',
    2: 'crate',
    3: 'blocker',
    4: 'hazard',
    5: 'steam',
    6: 'portal',
    7: 'spring',
};

class Game {
    constructor(data, Levels) {

        if (typeof data.level === 'undefined' || !data.segments || !data.entities || !data.clicks) {
            throw new Error('Invalid game data [Earth]');
        }

        if (!Levels[data.level]) {
            throw new Error('Invalid game data [Wind]');
        }

        if (!this.isObjectAnArray(data.segments) || !this.isObjectAnArray(data.entities) || !this.isObjectAnArray(data.clicks)) {
            throw new Error('Invalid game data [Water]');
        }

        if (data.segments.length > 60) {
            throw new Error('Invalid game data [Fire]');
        }

        data.segments.forEach(segment => {
            if (!this.isSegmentValid(segment)) {
                throw new Error('Invalid game data [CAPTAIN PLANET!]');
            }
        });

        
        
        this.entities = data.entities;
        this.segments = data.segments;
        this.level = data.level;
        this.clicks = data.clicks;
        this.path = [];
        this.hero = {};
        this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH = 0;
        
        const level = Levels[data.level];
        const levelEntities = level.entities;
        
        this.entities = [ ...this.entities.filter(d => ~[EntityTypes.PORTAL, EntityTypes.SPRING].indexOf(d[2])), ...levelEntities ];
        
        this.dedupeSegments();
        this.disappointHackers();

        if (this.segments.length !== data.segments.length) {
            throw new Error('Invalid game data [Heart]');
        }
    }
    isCellOneWay([x, y]) {
        return this.entities.some(entity => {
            return entity[0] === x && entity[1] === y && ~[EntityTypes.PORTAL, EntityTypes.START, EntityTypes.END].indexOf(entity[2]);
        });
    }
    isPointInSegment(point, segment) {
        const [start, end] = segment;
        const [x, y] = point;
        return start[0] === x && start[1] === y || end[0] === x && end[1] === y;
    }
    isPointInAnySegment(point) {
        return this.segments.some(segment => {
            return this.isPointInSegment(point, segment);
        });
    }
    getCellMidpoint([x, y]) {
        return [ x % 2 === 0 ? x + 1 : x, y % 2 === 0 ? y + 1 : y ]
    }
    getCellByPoint([x, y]) {
        const subcell = [ Math.floor(x / cellSize), Math.floor(y / cellSize) ];
        return [ subcell[0] % 2 === 0 ? subcell[0] + 1 : subcell[0], subcell[1] % 2 === 0 ? subcell[1] + 1 : subcell[1] ];
    }
    getSegmentMidpoint([start, end]) {
        return [ (start[0] + end[0]) / 2, (start[1] + end[1]) / 2 ];
    }
    pythag([x1, y1], [x2, y2]) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    isObjectAnArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    isSegmentValid(segment) {
        const [start, end] = segment;
        if (!start || !end) return false;
        return this.pythag(start, end) === 1;
    }
    dedupeSegments() {
        const deduped = [];
        this.segments.forEach(segment => {
            const [start, end] = segment;
            const [startX, startY] = start;
            const [endX, endY] = end;
            const existing = deduped.find(([dedupedStart, dedupedEnd]) => {
                const [dedupedStartX, dedupedStartY] = dedupedStart;
                const [dedupedEndX, dedupedEndY] = dedupedEnd;
                return dedupedStartX === startX && dedupedStartY === startY && dedupedEndX === endX && dedupedEndY === endY;
            });
            if (!existing) {
                deduped.push(segment);
            }
        });
        this.segments = deduped;
    }
    disappointHackers() {
        this.segments = this.segments.filter(segment => {
            const midpoint = this.getSegmentMidpoint(segment);
            const cell = this.getCellByPoint(midpoint.map(d => d * cellSize));
            return !this.entities.some(entity => entity[2] === EntityTypes.BLOCKER && entity[0] === cell[0] && entity[1] === cell[1]);
        });
    };
    getEntitiesByType(type) {
        return this.entities.filter(entity => entity[2] === type);
    }
    getEntitiesAtCell([x, y]) {
        return this.entities.filter(entity => entity[0] === x && entity[1] === y);
    }
    removeEntity(cell, type) {
        this.entities = this.entities.filter(entity => entity[0] !== cell[0] || entity[1] !== cell[1] || entity[2] !== type);
    }
    getNextJourney() {
        const [ currentJourneyStart, currentJourneyEnd ] = this.hero.journey;

        const potentialPaths = this.segments.filter(([ potentialStart, potentialEnd ]) => {
            return potentialStart[0] === currentJourneyEnd[0] && potentialStart[1] === currentJourneyEnd[1] || 
                    potentialEnd[0] === currentJourneyEnd[0] && potentialEnd[1] === currentJourneyEnd[1];
        });

        if (potentialPaths.length === 1) {
            if (potentialPaths[0][0][0] === currentJourneyEnd[0] && potentialPaths[0][0][1] === currentJourneyEnd[1]) {
                return potentialPaths[0];
            } else {
                return [ potentialPaths[0][1], potentialPaths[0][0] ];
            }
        } else {
            // favor the path that doesn't lead back to the currentJourneyStart
            const ideal = potentialPaths.find(([ potentialStart, potentialEnd ]) => {
                return !this.isPointInSegment(currentJourneyStart, [ potentialStart, potentialEnd ]);
            });
    
            if (ideal) {
                if (ideal[0][0] === currentJourneyEnd[0] && ideal[0][1] === currentJourneyEnd[1]) return ideal;
    
                return [ ideal[1], ideal[0] ];
            }
    
            const fallback = potentialPaths.find(([ potentialStart, potentialEnd ]) => {
                return potentialEnd[0] === currentJourneyStart[0] && potentialEnd[1] === currentJourneyStart[1];
            });
            return [ fallback[0], fallback[1] ];
        }
    }
    isNearHazard() {
        const [x, y] = this.hero.journey[0];
        const [x2, y2] = this.hero.journey[1];
        const midway = [ (x + x2) / 2, (y + y2) / 2 ];
        const hazards = this.entities.filter(entity => entity[2] === EntityTypes.HAZARD);
        const heroCell = this.getCellMidpoint(this.hero.journey[0]);
    
        return hazards.find(hazard => {
            return this.pythag(midway, hazard) < 2.09;
        })
    }
    getSegmentsThatTouchPoint(point) {
        return this.segments.filter(segment => {
            return this.isPointInSegment(point, segment);
        });
    }
    getSegmentInfo(segment) {
        const [start, end] = segment;
        const [startX, startY] = start;
        const [endX, endY] = end;
        const segMidpoint = this.getSegmentMidpoint(segment);
    
        const point = this.getCellByPoint(segMidpoint.map(d => d * cellSize));
        
        const segmentIndex = this.getIndexOfSegment(segment);
    
        const isHorizontal = startY === endY;
        const isVertical = startX === endX;
    
        const isLeftToMid = isHorizontal && this.isPointInSegment([ point[0] - 1, point[1] ], segment);
        const isRightToMid = isHorizontal && this.isPointInSegment([ point[0] + 1, point[1] ], segment);
        const isTopToMid = isVertical && this.isPointInSegment([ point[0], point[1] - 1], segment);
        const isBottomToMid = isVertical && this.isPointInSegment([ point[0], point[1] + 1], segment);
    
        return {
            segmentIndex,
            isHorizontal,
            isVertical,
            isLeftToMid,
            isRightToMid,
            isTopToMid,
            isBottomToMid,
        };
    }
    rotateSegments(cell, addClick = false) {
        const point = this.getCellMidpoint(cell);

        const toRotate = this.getSegmentsThatTouchPoint(point);
        
        if (toRotate.length) {
            
            const newSegments = [];
            toRotate.forEach(segment => {
                // does segment span from left side to midpoint?

                const [start, end] = segment;
                const [startX, startY] = start;
                const [endX, endY] = end;
                            
                const {
                    segmentIndex,
                    isLeftToMid,
                    isRightToMid,
                    isTopToMid,
                    isBottomToMid,
                } = this.getSegmentInfo(segment);
                
                if (isLeftToMid) {
                    newSegments.push([point, [point[0], point[1] - 1]]);
                } else if (isRightToMid) {
                    newSegments.push([point, [point[0], point[1] + 1]]);
                } else if (isTopToMid) {
                    newSegments.push([point, [ point[0] + 1, point[1]]]);
                } else if (isBottomToMid) {
                    newSegments.push([point, [ point[0] - 1, point[1]]]);
                }
                this.segments.splice(segmentIndex, 1);
            });
            this.segments = this.segments.concat(newSegments);
            if (addClick) {
                this.addClick(cell);
            }
        }
    }
    addClick(cell) {
        this.clicks.push([cell, this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH + 1]);
    }
    getIndexOfSegment([start, end]) {
        return this.segments.findIndex(segment => {
            return segment[0][0] === start[0] && segment[0][1] === start[1] && segment[1][0] === end[0] && segment[1][1] === end[1];
        })
    }
    getSpringTarget(springCell) {
        const journey = this.hero.journey;
        const dy = journey[1][1] - journey[0][1];
        const dx = journey[1][0] - journey[0][0];

        let nextPoint = [ springCell[0], springCell[1] ];
        let entityHere;
        let searchLimit = 15;
        let searchIndex = 0;
        let validTarget;

        do {
            searchIndex += 1;
            nextPoint = [ nextPoint[0] + dx, nextPoint[1] + dy ];
            
            entityHere = this.entities.find(entity => 
                ~[
                    EntityTypes.PORTAL,
                    EntityTypes.SPRING,
                ].indexOf(entity[2]) &&
                searchIndex &&
                entity[0] === nextPoint[0] &&
                entity[1] === nextPoint[1]);
            
            if (searchIndex >= searchLimit) {
                break;
            }

            validTarget = this.isPointInAnySegment(nextPoint) || entityHere;
        } while (!validTarget);

        if (this.isPointInAnySegment(nextPoint) || entityHere) {
            if (entityHere) return this.segments[0][0]; // fix this
            return nextPoint;
        } else {
            return;
        }        
    }
    displayEntity(entity) {
        console.log(`ENTITY [${EntityTypesRef[entity[2]]}]: ${entity[0]}, ${entity[1]}`);
    }
    processEntityInteractions(position) {
        const cellEntities = this.getEntitiesAtCell(position);

        cellEntities.forEach(this.displayEntity);
        
        if (cellEntities.length === 0) return;

        let result;

        cellEntities.forEach(entity => {
            switch(EntityTypesRef[entity[2]]) {
                case 'crate':
                    if (typeof playSfx !== 'undefined') playSfx('pickup.mp3');
                    this.path.push(`${this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH}: REMOVED CRATE`);
                    this.removeEntity(this.hero.journey[1], EntityTypes.CRATE);
                    break;
                case 'spring':
                    const target = this.getSpringTarget(position);
    
                    if (target) {
                        const startSegments = this.getSegmentsThatTouchPoint(target);
                        if (!startSegments.length) {
                            return;
                        }
                        if (typeof playSfx !== 'undefined') playSfx('spring.mp3');
                        let newJourney = startSegments[0];
                        newJourney = newJourney[0][0] === target[0] && newJourney[0][1] === target[1] ? newJourney : [ newJourney[1], newJourney[0] ];
                        this.hero.progress = 0;
                        this.hero.newJourney = newJourney;
                        this.hero.airtime = Math.floor(this.pythag(position, newJourney[0]) * 5);
                        this.hero.airtimeStatic = this.hero.airtime;     
                    }
                    break;
                case 'end':
                    if (!this.entities.find(entity => entity[2] === EntityTypes.CRATE)) {
                        result = {
                            success: true,
                            data: {
                                segments: this.segments.length,
                                clicks: this.clicks.length,
                                level: this.level,
                                ticks: this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH,
                                goodScore: calculateScore(this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH, this.segments.length, this.clicks.length),
                                evilScore: calculateScore2(this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH, this.segments.length, this.clicks.length),
                            }
                        };
                        
                    }
                    break;
                default:
            }
        });
        return result;
    }
    hasStartSegments() {
        return this.getSegmentsThatTouchPoint(this.entities.find(entity => entity[2] === EntityTypes.START)).length > 0;
    }
    gameLoop() {
        const click = this.clicks.find(([cell, ts]) => ts === this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH);
        
        if (this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH === 0 && this.getEntitiesByType(EntityTypes.SPRING).length > 2 && typeof process === 'undefined') {
            console.log(whyCantIHoldAllTheseSprings());
        }
        
        if (click) {
            this.path.push(`${this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH}: CLICKED ${click[0]}`);
            this.rotateSegments(click[0]);
        }
        if (typeof this.hero.cell === 'undefined') {
            // initialize hero
            this.hero.cell = this.getEntitiesByType(EntityTypes.START)[0];
            this.hero.x = this.hero.cell[0] * cellSize;
            this.hero.y = this.hero.cell[1] * cellSize; 
            this.hero.progress = 0;
            const startSegments = this.getSegmentsThatTouchPoint(this.entities.find(entity => entity[2] === EntityTypes.START));
            if (!startSegments.length) {
                console.log('no start segment found');
                return;
            }
            const startCell = this.hero.cell;
            this.hero.journey = startSegments[0]
            this.hero.journey = this.hero.journey[0][0] === startCell[0] && this.hero.journey[0][1] === startCell[1] ? this.hero.journey : [ this.hero.journey[1], this.hero.journey[0] ];
        } else {
            if (typeof walkingSfx !== 'undefined') walkingSfx.volume = this.hero.airtime > 0 ? 0 : 1;
            if (this.hero.airtime > 0) {
                this.hero.airtime -= 1;
                if (this.hero.airtime === 0) {
                    const currentCellEntities = this.getEntitiesAtCell(this.hero.journey[0]);
                    if (currentCellEntities.some(entity => entity[2] === EntityTypes.CRATE)) {
                        this.path.push(`${this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH}: REMOVED CRATE`);
                        this.removeEntity(this.hero.journey[0], EntityTypes.CRATE);
                    }
                }
            } else {
                const midpoint = this.getCellMidpoint(this.hero.journey[0]);
                // const cellGeometry = getCellGeometry(midpoint);
                const nearHazard = this.isNearHazard();
                const cellEnts = this.getEntitiesAtCell(midpoint);
                const isHot = cellEnts.some(entity => entity[2] === EntityTypes.STEAM);
                this.hero.face = nearHazard ? '_nervous' : (isHot ? '_hot' : '');
                
                if (typeof crabSfx !== 'undefined') crabSfx.volume = nearHazard ? 1 : 0;
                if (typeof sizzleSfx !== 'undefined') sizzleSfx.volume = isHot ? 1 : 0;

                if (this.hero.progress === 0) this.processEntityInteractions(this.hero.journey[0]);

                this.hero.progress += nearHazard ? .035 : ( isHot ? 0.15 : 0.075 );
                let newJourney;
                if (this.hero.progress >= 1) {

                    const result = this.processEntityInteractions(this.hero.journey[1]);
                    if (result) return result;

                    this.hero.progress = 0;

                    if (this.hero.newJourney) {
                        this.hero.cell = this.hero.journey[1];
                        newJourney = this.hero.newJourney;

                        this.hero.newJourney = null;
                    } else {
                        this.hero.cell = this.getCellMidpoint(this.hero.journey[1]);
                        newJourney = this.getNextJourney();
                    }
                    const currentCellEntities = this.getEntitiesAtCell(this.hero.journey[1]);
                    this.path.push(`${this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH}: ${this.hero.journey[1]}`);
                    if (currentCellEntities.some(entity => entity[2] === EntityTypes.PORTAL)) {
                        const allPortals = this.getEntitiesByType(EntityTypes.PORTAL);
                        
                        if (allPortals.length !== 2) return;
                        const otherPortal = allPortals.find(portal => {
                            return portal[0] !== this.hero.journey[1][0] || portal[1] !== this.hero.journey[1][1];
                        });

                        if (!otherPortal) return;
                        const startSegments = this.getSegmentsThatTouchPoint(otherPortal);
                        if (!startSegments.length) {
                            console.log('no start segment found');
                            return;
                        }
                        if (typeof playSfx !== 'undefined') playSfx('pop.mp3');
                        newJourney = startSegments[0];
                        newJourney = newJourney[0][0] === otherPortal[0] && newJourney[0][1] === otherPortal[1] ? newJourney : [ newJourney[1], newJourney[0] ];
                    } 
                    if (newJourney) {
                        this.hero.journey = newJourney;
                    } else {
                        this.hero.journey = [ this.hero.journey[1], this.hero.journey[0] ];
                    }
                } 
            }
        }
        this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH += 1;
        return {
            success: false,
        }
    }
    solve() {
        return new Promise((resolve, reject) => {
            let result;
            do {
                result = this.gameLoop();
                if (this.EMMEHGERDTICKSTHERESTICKSEVERYWHEREARHGHAHGREHUHGHH > 999) {
                    return reject({
                        success: false,
                        reason: 'timeout',
                    });
                }
            } while (!(result || {}).success);
            if (result.success) {
                return resolve(result);
            }
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Game,
        EntityTypes,
    };
}


let calculateScore = (ticks, segments, clicks) => {
    // Base score
    let baseScore = 1000;

    // Ticks penalty: More ticks lead to a greater penalty
    let ticksPenalty = ticks * 1; // 1 point deducted per tick

    // Segments penalty: More segments lead to a greater penalty
    let segmentsPenalty = segments * 5; // 5 points deducted per segment

    // Final score calculation
    let score = baseScore - ticksPenalty - segmentsPenalty;

    // Ensure score doesn't go below 0
    score = Math.max(score, 0);

    return score;
}

let calculateScore2 = (ticks, segments, clicks) => {
    // Maximum possible score
    let maxScore = 1000;

    // Score gain: reward for more ticks and segments
    let ticksScore = ticks * .5;  // Each tick adds 1.5 points
    let segmentsScore = segments * 10;  // Each segment adds 15 points

    // Clicks penalty: Penalize heavily for clicks
    let clicksPenalty = clicks * 250;  // Each click subtracts 25 points

    // Calculate the total score
    let score = ticksScore + segmentsScore - clicksPenalty;

    // Ensure the score is within the 0 to 1000 range
    score = Math.min(Math.max(score, 0), maxScore);

    return score;
}

const whyCantIHoldAllTheseSprings = () => `

                                     WHY CAN'T I HOLD ALL THESE SPRINGS??


                                                                                                                                     
                                                 .--======-                                                          
                                             --              --.                                                     
                                          -=                     =:                                                  
                                        .=                         -                                                 
                                       -.                            -                                               
                                      ::                             .:                                              
                                      :                               :.                                             
                                     +                                 -                                             
                                    .-                                 :                                             
                                    ::                                 .-                                            
                                    ..                                  =                                            
                                    :                 :.                =:                                           
                                    :                                  =:  -                                         
                                     =                                *    -                                         
                                     ..       :        .:. ..              -                                         
                                      .                                   :.                                         
                 =.   .++:  ..        .   .                 :            =                                           
               +  *=.       =         -       .         *@@ .+          #                                            
              -+-     .:-**--::::     =               :+#%*-.          .:                                            
            :-   -+.            -      = .@@# *                        =                                             
        .#   .*               :-       .: #+:                          :                                             
      +   +=     -#.            -        =       :                     -                                             
     #        .=                =        .      +                      -.             .=++-         :-               
     =      -.          .++=-=+-         .     =        -                    ..:----    ...           ::             
     +   .-     :=.      : ..-+%+         +    :-   :: ..                           -***+++++=          =            
      -      .+        ..-::   *%:--.      +     -          .-*:                  .++*++++----::.       ..           
      .:   #       =%:.-:.    :*#:=+%=      #           .***+--=::--:..  .-:      :++*-::----:::....:    =           
       #      .+.   -.::    ..=#=: .*#.      .=  :+**:.+**==+:...:::::::::-. +:  :.-++.          .::-... +           
       +           .:.:    .--*... .#+-:=**-   -.     -+*+#+-.  -          .-=#. :.*:+*=..          .:- - -          
       =        ++=-.:    ..-*-..  ++::---*%- :=-.    -++*:    ..           =%#. :.-*-:=*+-.....      .-.+ -.        
       =       :*==.-.   ..-*:..  =:.-...:=%=....::   .:++++. :-......-===*#%+. .=:--+..::-+*+=---..   =#*. :        
       +       +*=*=-.  ..-*::. -+...     =#:.=+*%-+  . --:-++*********=:.-::**.:=..:=+:  :... :+**###%@*.   #       
       +       **=#=#   -*+:.-=+= ..     -*.-.   ##.   :..*+--:.......:-:   .*#:::  .:. =+.    :-:....:.      -      
       +       -***+=-+*+:-: ==..:.     =-.:     *#:.=#+::--===:         .-+%#::.+=+-...:..-==.     .+#=      :      
       +        ++++++-:===+=..:.-    .+:.:    .=*-:..:##-..:.....:::::::-=-:..:-.=.    ..:....:+###%#-        *     
       =          .-.:--:.:-:.:=:    ==...    .-+.:   .+%:+#+.-..::::...:---:=+:.:-=.         :-::...           :    
       ..         +  -...-=.  .+- .+-.::     .=- .  .:=**-==*%==            -+#- .:.:=:         .--=            -    
        :         *  -   . -****-.-::-.:    .+...  :: -=.-:.=%=**.          +%#=+-..::.-*=:.     .+#:            #   
        -         *  -     ..:::::. .=-.  :=..:  ... .:..+-.=%=+%========+#%*::=      .:.. :*#**#%%-              .  
         =        :  =         ..=+-:=====..:.  ... -....=- +.-=*-........--.-=-=.   +    ..:::::.                :  
         *        ..:            ......-::.--. .-:=:..  . =+.:-=.:       . =-=#=.:=-..--      :-*                 -  
         :.        -.                 .==:.-=. -+:..     -= ::::.        ::-+*%-:...=+=...    :+#.                =  
          .        =.                  .  ....=-:.      -:.:==:.-.:.... .-=+%#:    ... .=**+*#%#:                 .: 
          :        -                   . .:..+=-+.   -=..:+.=.:-..........:::-=--:..    .:::::.                   .- 
          :        .=  = .:           .=   .=. .....--....=:.--:      .:.+=..=*+- ..::.    +==.                    + 
          :         -   =  .-         .:     =  ...-+=-:--::=.   ....:.:.:.  =%=.:-.  .=.. :*#.                    + 
          -         :  ==    +.        :=     :-  ...::...::--==-......=:-==#%-  ....:=**#%%+.                     + 
          -          . .=:     +       .:.:     *        .-=--:...-=========:-*:      .:---+-.                     + 
          -             -+      -       :.*      =:      : +-     ...:---. -:-*+        :-** -                     + 
          -             :=..     .+       *        +     .:.:+         .:=- .*%-.-+==--=*%+. =                     + 
          -              .- :=      :=++==.         .-   ..+:-==-.      .-=##+=+.....-===*-  :==:                  + 
          -               .-   =                      -.  . = ..............=*#-:-===+##*=--.                      + 
          -                =-%=                        -:  .:.-.         .-+#+. .:.:=-:                           -  
          -                 - :*.                       -    ..:..::--:.. .-. :==*                                :  
           =                 : - .+                      .-        .*+.                                         =    
            =                = *    .=                      -+====:                                            :.    
             =               = -.      --                                                                     :      
              :              =  :          .---:::                                                           =       
              =              =  -                   .==..                                                  +         
               -                :                            .+*+.                                      :=           
                -.             :.                                        ::---=+**+-.               -#:              
                 ..            *                                                           :                         
                  ::           #                                                           -                         
                   :          +:                                                          :.                         
                    :.      :-.                                                           =                          
                              :                                                           .                          
                              :                                                          -                           
                              -                                                         .-                           
                              =                                                         -                            
                              -                                                        ..                            
                             -                                                         +                                          
`;