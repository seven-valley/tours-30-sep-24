# React Hook form
https://react-hook-form.com/get-started
```
npm install react-hook-form
```
# avant
```tsx
let counter =0;
export default function App() {
  
  const valider =(e:any)=>{
    e.preventDefault();
    console.log(e.target.appareil.value);
    console.log(e.target.statut.value);
  }
  return (
    <>
      <form method="post" onSubmit={valider} >
        <input name="appareil"/><br /><br />
        <input name="statut" />
        <button type="submit">GO</button>
      </form>
      
    </>
  )
}
```



# apres
```tsx
import { useForm } from "react-hook-form"

export default function App() {
  const {register, handleSubmit} = useForm();
  const valider =(data:any)=>{
    console.log(data);
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(valider)} >
        <input {...register("appareil")} />
        <input {...register("statut")} />
        <button type="submit">GO</button>
      </form>
      
    </>
  )
}
```

# le watch 
```tsx
import { useForm } from "react-hook-form"
let counter =0;
export default function App() {
  const {register, watch, handleSubmit} = useForm(); // importer watch
  const valider =(data:any)=>{
    console.log(data);
  }
  console.log(watch('appareil'))
  return (
    <>
      <form onSubmit={handleSubmit(valider)} >
        <input {...register('appareil')} />
        <input {...register('statut')} />
        <button type="submit">GO</button>
      </form>
      <p> Render {counter++}</p>
    </>
  )
}
```

# La gestion des erreurs
```tsx
import { useForm } from "react-hook-form"

export default function App() {
  const {register,  handleSubmit ,formState: { errors },} = useForm();
  const valider =(data:any)=>{
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(valider)} >
        <input {...register('appareil',{
					required: true
					
				})} /><br />
        {/* error message => appareil */}
			{errors.appareil && <span>Vous devez ecrire le nom </span>}
      <br /> <input {...register('statut')} />
        <button type="submit">GO</button>
      </form>
      
    </>
  )
}
```

# le typeScript
```tsx
import { useForm, SubmitHandler } from "react-hook-form"

export default function App() {
  const {register,  handleSubmit ,formState: { errors },} = useForm();
  
  interface IFormInput {
    appareil: string
    status: string

  }
  
  const valider: SubmitHandler<IFormInput> =(data:any)=>{
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(valider)} >
        <input {...register('appareil',{
					required: true, maxLength: 20
					
				})} /><br />
        {/* error message => appareil */}
			{errors.appareil && <span>Vous devez ecrire le nom </span>}
      <br /> <input {...register('statut',{ pattern: /^[A-Za-z]+$/i })} />
        <button type="submit">GO</button>
      </form>
     
    </>
  )
}
```
## correction
```jsx
import { useForm } from "react-hook-form"

export default function App() {
  const {register,  handleSubmit ,formState: { errors },} = useForm();
  const valider =(data:any)=>{
    console.log(data);
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(valider)} >
      {errors.appareil && <span>Vous devez ecrire le nom </span>}
      <br />
        <input {...register("appareil",{
					required: true
				})} />
        <br />
        {errors.statut && <p role="alert">{errors.statut.message}</p>}
        <input {...register("statut",{ 
          required: "remplir svp", 
          minLength: {value:3,message:'3 char min'},
          pattern:{ value: /^[A-Za-z]+$/i ,message:"pas chiffre"} })} />
        <br />
        <button type="submit">GO</button>
      </form>
      
    </>
  )
}
```