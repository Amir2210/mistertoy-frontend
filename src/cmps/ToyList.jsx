import { ToyPreview } from './ToyPreview';

export function ToyList({toys, onRemoveToy, onEditToy}) {
  
  return (
    <ul className="toy-list">
        {toys.map(toy =>
            <ToyPreview
                key={toy._id}
                toy={toy}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
            />
        )}
    </ul>
)
}
