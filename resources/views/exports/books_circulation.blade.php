<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Book Item</th>
        <th>Member</th>
        <th>Issue Date</th>
        <th>Return Date</th>
        <th>Status</th>
    </tr>
    </thead>
    <tbody>
    @foreach($books as $book)
        <tr>
            <td>{{ $book['book_item']['book']['name'] }}</td>
            <td>{{ $book['book_item']['book_code'] }}</td>
            <td>{{ $book['member']['first_name'].' '.$book['member']['last_name'] }}</td>
            <td>{{ Carbon\Carbon::parse($book['issued_on'])->format('jS M,Y') }}</td>
            <td>{{ isset($book['return_date']) ? Carbon\Carbon::parse($book['return_date'])->format('jS M,Y') : '' }}</td>
            <td>{{ \App\Models\IssuedBook::STATUS[$book['status']] }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
