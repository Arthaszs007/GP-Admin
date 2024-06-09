//for serve login function


type Games=Game[]

type Game ={
    id:string,
    name:string,
    description:string,
    release:string,
    developer:string,
    genre:string,
    platform:string,
    scores:string,
    images:string
}
// for rank data
type Rank ={
    id:string,
    name:string,
    description:string,
    children:string
}
//for rank view page
type Rankchild={
    name:string,
    genre:string,
}

type Rankchildren =Rankchild[]