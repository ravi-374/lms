<?php

namespace Tests\Models;

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookItemTest
 */
class BookItemTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function test_return_last_issued_book_item_status()
    {
        $bookItem = factory(BookItem::class)->create();
        factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem->id,
            'status'       => IssuedBook::STATUS_RETURNED,
        ]);

        factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem->id,
            'status'       => IssuedBook::STATUS_RESERVED,
        ]);

        $this->assertNotEmpty($bookItem->book_item_status);
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $bookItem->book_item_status);
    }

    /** @test */
    public function test_return_issued_book_available_when_book_is_returned()
    {
        $bookItem = factory(BookItem::class)->create();
        factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_RETURNED, 'book_item_id' => $bookItem->id]);

        $this->assertNotEmpty($bookItem->book_item_status);
        $this->assertEquals(IssuedBook::STATUS_AVAILABLE, $bookItem->book_item_status);
    }

    /** @test */
    public function test_return_empty_available_date_when_book_is_not_issued()
    {
        $bookItem = factory(BookItem::class)->create();
        factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_RETURNED, 'book_item_id' => $bookItem->id]);

        $this->assertNull($bookItem->expected_available_date);
    }

    /** @test */
    public function test_return_available_date_when_book_is_reserved()
    {
        $bookItem = factory(BookItem::class)->create();
        factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem->id,
            'status'       => IssuedBook::STATUS_RESERVED,
        ]);

        $bookItem = BookItem::with('lastIssuedBook')->find($bookItem->id);

        $returnDueDays = getSettingValueByKey(Setting::RETURN_DUE_DAYS);
        $expectedAvailableDate = Carbon::now()->addDays($returnDueDays)->toDateTimeString();
        $this->assertNotEmpty($bookItem->expected_available_date);
        $this->assertEquals($expectedAvailableDate, $bookItem->expected_available_date);
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $bookItem->lastIssuedBook->status);
    }

    /** @test */
    public function test_return_available_date_when_book_is_issued()
    {
        $bookItem = factory(BookItem::class)->create();

        /** @var IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem->id,
            'status'       => IssuedBook::STATUS_ISSUED,
        ]);

        $this->assertNotEmpty($bookItem->expected_available_date);
        $this->assertEquals($issuedBook->return_due_date, $bookItem->expected_available_date);
    }
}
