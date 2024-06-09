//for game type
export enum EGenre{
    Action= "Action" ,
    Adventure="Adventure",
    playing="Role-playing",
    Simulation="Simulation",
    Strategy="Strategy",
    Puzzle="Puzzle",
    Sports="Sports",
    Racing="Racing",
    Fighting="Fighting",
    Shooter="Shooter",
    Platformer="Platformer",
    Sandbox="Sandbox",
    Survival="Survival",
    Horror="Horror",
    Educational="Educational"
 
 }


 export enum EErrorType{
    NO_ERROR ="noError",
    ID_USED="gameid_used_error",
    UNVALID_INPUT="unvalid_input_error",
    UNKNOWN="unknown_error",
    GAMELIST_LOADING_FAILD="gamelist_loading_faild",
    FETCH_FAILD="fetch_faild",
    PARAMS_UNDEFINED="params_undefined"

 }

 export enum ECollectionName{
   ADMIN="admin",
   GAMES="games",
 }