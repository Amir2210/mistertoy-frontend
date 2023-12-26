import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,   RadialLinearScale} from 'chart.js'
import { Doughnut, PolarArea } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function MyDonut() {
   const data = {
        labels: [  'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
        'Battery Powered'],
        datasets: [
            {
                label: '# Total products',
                data: [12, 19, 31, 51, 8, 55, 79, 29, 12],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(0, 0, 255, 0.2)',
                    'rgba(255, 255, 0, 0.2)',
                    'rgba(0, 255, 255, 0.2)',
                    'rgba(255, 0, 255, 0.2)',
                    'rgba(128, 128, 0, 0.2)',
                    'rgba(128, 0, 128, 0.2)',
                    'rgba(0, 128, 128, 0.2)'
                    
                ],
                borderColor: [
                    'rgba(255, 0, 0, 0.2)',
                    'rgba(0, 255, 0, 0.2)',
                    'rgba(0, 0, 255, 0.2)',
                    'rgba(255, 255, 0, 0.2)',
                    'rgba(0, 255, 255, 0.2)',
                    'rgba(255, 0, 255, 0.2)',
                    'rgba(128, 128, 0, 0.2)',
                    'rgba(128, 0, 128, 0.2)',
                    'rgba(0, 128, 128, 0.2)'
                    
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <section style={{maxWidth:'35vw',}}>
            <Doughnut data={data} />
            <hr />
            {/* <PolarArea data={data} /> */}
        </section>
    )
}
