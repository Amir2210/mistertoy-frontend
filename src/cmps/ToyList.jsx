import { ToyPreview } from './ToyPreview';

export function ToyList({toys}) {
  
  return (
    <ul className="car-list">
        {toys.map(toy =>
            <ToyPreview
                key={toy._id}
                toy={toy}
            />
        )}
    </ul>
)
}
