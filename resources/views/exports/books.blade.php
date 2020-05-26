<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Image</th>
        <th>Description</th>
        <th>Published On</th>
        <th>ISBN</th>
        <th>URL</th>
        <th>Is Featured</th>
    </tr>
    </thead>
    <tbody>
    @foreach($books as $book)
        <tr>
            <td>{{ $book->name }}</td>
            <td>{{ $book->image ? $book->image_path : '' }}</td>
            <td>{!!  nl2br(e($book->description)) !!} </td>
            <td>{{ $book->published_on }}</td>
            <td>{{ $book->isbn }}</td>
            <td>{{ $book->url }}</td>
            <td>{{ ($book->is_featured == 1) ? 'Yes' : 'No' }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
