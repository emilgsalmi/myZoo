import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAnimals } from "../../models/IAnimals";
import './AnimalDetailPage.scss';

export function AnimalDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [animal, setAnimal] = useState<IAnimals>();
    
  
    useEffect(() => {
      const storedAnimals = localStorage.getItem('animals');
      if (storedAnimals) {
        const animals = JSON.parse(storedAnimals);
        const selectedAnimal = animals.find((a: IAnimals) => a.id) || null;
        if (selectedAnimal) {
          setAnimal(selectedAnimal);
        }
      }
    }, [id])

    return(
        <div className="animalContainer">
            <h1>{animal?.name}</h1>
            <img src={animal?.imgUrl}></img>
            <p>{animal?.longDescription}</p>
        </div>
        
    )
}