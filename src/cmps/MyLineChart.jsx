import { Chart as ChartJS, ArcElement, Tooltip, RadialLinearScale, CategoryScale,  LinearScale,PointElement,LineElement,Title,Legend,} from 'chart.js'
import { Line } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend,  CategoryScale,LinearScale,PointElement,LineElement,Title)


export function MyLineChart(){
     const options ={
        responsive: true,
        plugins: {
        //   legend: {
        //     position: 'top' as const,
        //   },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
    }
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data={
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [13,78,45,9,66,120,82,17,100,55,175,56,],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: [120,82,17,100,55,175,56,13,78,45,9,66,],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    }
    return <Line options={options} data={data} />;
}