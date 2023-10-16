import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ApiNasa() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState('2023-10-16');

    useEffect(() => {
        setLoading(true); // Indicar que se está cargando nuevamente.

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${YOURKEY}=${selectedDate}`;

        axios.get(apiUrl)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al cargar datos desde la API:', error);
                setLoading(false);
            });
    }, [selectedDate]); // Se ejecuta cada vez que 'selectedDate' cambia.

    const CambioDeFecha = (e) => { // evita que se actualize la pagina con el set de el date
        setSelectedDate(e.target.value);
    }

    return (
        <div>
            {loading ? (<p>Cargando</p>)
                :
                (
                    <div className="text-center bgblue p-6">
                        {loading ? (
                            <p className="text-3xl text-gray-600">Cargando...</p>
                        ) : (
                            <div className="h-screen p-8 my-1 flex flex-col items-center justify-center">
                                <div className=' bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg p-10'>                            <h2 className="text-4xl text-pink-500 font-bold">{data.title}</h2>
                                    <h1 className="text-2xl font-semibold mt-4">Selecciona una fecha</h1>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={CambioDeFecha}
                                        className="text-xl px-4 py-2 border border-pink-300 mt-2 rounded-xl focus:ring-2 focus:ring-pink-500"
                                    />
                                    <div className='grid grid-cols-2'>
                                        <div className=' grid place-content-center'>
                                            <img className=" w-96 mt-4 rounded-xl shadow-md" src={data.url} alt={data.title} />
                                        </div>
                                        <div className=' grid place-content-centerF'>
                                            <p className="text-lg text-white mt-4 text-center">{data.explanation}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        )}
                    </div>

                )}
        </div>
    )
}

export default ApiNasa;
