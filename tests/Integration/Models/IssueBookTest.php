<?php

namespace Tests\Integration\Models;

use App\Models\IssuedBook;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class SettingTest
 * @package Tests\Integration\Models
 */
class IssueBookTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_can_get_issue_book_of_given_member()
    {
        $member1 = factory(IssuedBook::class)->create();
        $member2 = factory(IssuedBook::class)->create();

        $members = IssuedBook::ofMember($member1->member_id)->get();
        $this->assertCount(1, $members);

        $firstMember = $members->first();
        $this->assertEquals($member1->id, $firstMember->id);
        $this->assertEquals($member1->member_id, $firstMember->member_id);
    }

    /** @test */
    public function it_can_get_issue_book_of_reserve_date()
    {
        $book1 = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_RESERVED,
        ]);

        $book2 = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_RETURNED,
        ]);

        $books = IssuedBook::reserve($book1->status)->get();
        $this->assertCount(1, $books);

        /** @var IssuedBook $firstBook */
        $firstBook = $books->first();
        $this->assertEquals($book1->id, $firstBook->id);
    }
}