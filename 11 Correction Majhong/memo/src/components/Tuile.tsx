interface IPropsTuile {
  indice: number;
  valeur: number;
  sel:number;
  comparer:(i:number)=> void;
}
export default function Tuile({indice,valeur,comparer,sel}:IPropsTuile) {
     return (
       <div className={sel==indice ? 'green':''}>
        {valeur != -1 &&
            <img 
            onClick={()=>comparer(indice)}
            src={`./src/assets/img/${valeur}.webp` }  width="80" />
        }
        </div> 
  )
}