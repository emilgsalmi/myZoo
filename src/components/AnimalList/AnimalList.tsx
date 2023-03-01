import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
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
                            <h2>{animals.name}</h2>
                            <img src={animals.imgUrl} alt={animals.name}/>
                            <p>{animals.shortDescription}</p>
                            <Link to={`animals/${animals.id}`}>Läs mer</Link>
                            {!animals.isFed &&(
                                <button onClick={() => handleFeedAnimal(animals.id)}>Mata djuret</button>
                            )}
                            {animals.isFed && (
                                <p>Senast matad {animals.lastFedTime.toLocaleString()}</p>
                            )}
                        </div>
                    ))}
                </div> 
        </>
    )
}


