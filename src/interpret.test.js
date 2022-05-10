import { interpret } from "./interpret";

it('transforms multi-line input into array with objects {note:"line 1" , type:"type"} as elements', () => { 
    
    expect(interpret(` glob is I\n`)).
        toEqual([{'note': 'glob is I','type':'number'}])
  
    expect(interpret(` glob glob Silver is 34 Credits\n`)).
      toEqual([{'note': 'glob glob Silver is 34 Credits','type':'exchange'}])

    expect(interpret(` how much is pish tegj glob glob ? \n
        how many Credits is glob prok Silver ? \n
        bla bla bla `)).
        toEqual([
          {'note': 'how much is pish tegj glob glob ?','type':'query'},
          {'note': 'how many Credits is glob prok Silver ?','type':'query'},
          {'note': 'bla bla bla','type':'invalid'}
        ])
    } )
