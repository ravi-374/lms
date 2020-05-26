<?php

namespace App\Exports;

use App\Models\Book;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class BookExport implements FromView, WithTitle, ShouldAutoSize, WithEvents
{
    public function view(): View
    {
        return view('exports.books', [
            'books' => Book::all(),
        ]);
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Books';
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
                $cellRange = 'A1:W1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(14);
            },
        ];
    }
}
