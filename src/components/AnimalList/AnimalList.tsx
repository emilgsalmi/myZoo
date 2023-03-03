import { useEffect, useState } from "react";
import { Link, Route, } from "react-router-dom";
import { IAnimals } from "../../models/IAnimals";
import './AnimalsList.scss';

export function Animals () {
    const [animals,setAnimals] = useState<IAnimals[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://animals.azurewebsites.net/api/animals");
            const data = await response.json();
            const initialAnimals = data.map ((animal:any) => ({
                id: animal.id,
                name: animal.name,
                shortDescription: animal.shortDescription,
                longDescription: animal.longDescription,
                imgUrl: animal.imageUrl,
                isFed:false,
                lastFedTime: undefined,
            }))
            setAnimals(initialAnimals);
            localStorage.setItem("animals", JSON.stringify(initialAnimals));
        };
        
        const storedAnimals = localStorage.getItem("animals");
        if (storedAnimals){
            setAnimals(JSON.parse(storedAnimals))
        }
        else {
            fetchData()
        }
    },[])   

    const handleFeedAnimal = (id:number) => {
        setAnimals(prevAnimals =>
            prevAnimals.map (animal => animal.id === id ? {...animal,isFed:true, lastFedTime: new Date()}:animal));
            localStorage.setItem("animals", JSON.stringify(animals))
    }

    return (
        <>
            <h1>Mitt lilla Zoo</h1>
                <div className="container">
                    {animals.map(animals => (
                        <div key={animals.id}>
                            <h2 className="animalName">{animals.name}</h2>
                            <img className="animalImg" src={animals.imgUrl} alt={animals.name}/>
                            <p className="animalDes">{animals.shortDescription}</p>
                            <Link key={animals.id} to={"AnimalDetailPage}"}>Läs mer</Link>
                            {!animals.isFed &&(
                                <button className="feed" onClick={() => handleFeedAnimal(animals.id)}>Mata djuret</button>
                            )}
                            {animals.isFed && (
                                <p className="fed">Senast matad {animals.lastFedTime.toLocaleString()}</p>
                            )}
                        </div>
                    ))}
                </div> 
        </>
    )
}


