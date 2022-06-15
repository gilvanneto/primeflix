import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api'
import './filme-info.css';
import {toast} from 'react-toastify';

// URL DA API https://api.themoviedb.org/3/movie/{MOVIE_ID}?api_key=4d349c58e0f2e49d3165df11cb56c020&language=pt-BR

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        async function loadFilme(){
            let end = '/movie/' + id;
            await api.get(end,{
                params:{
                    api_key: "4d349c58e0f2e49d3165df11cb56c020",
                    language: "pt-BR",
                }
            })
            .then((response)=>{  
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado");
                navigate("/",{replace: true})
                return;
            })
        }

        loadFilme();

        return ()=>{
            console.log("Componente foi desmontado");
        }  

    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilmes = filmesSalvos.some((filmesalvo)=> filmesalvo.id === filme.id)

        if(hasFilmes){
            alert("Este filme já está na lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso!");


    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }   
    let trailer = "https://youtube.com/results?search_query="+ filme.title +" Trailer";
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={"https://image.tmdb.org/t/p/original/"+ filme.backdrop_path} alt={filme.title}/>
            <h3>Sinopse</h3>
            <spam>{filme.overview}</spam>
            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={trailer}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;