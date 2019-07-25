<?php

namespace Tests\Integration\Models;

use App\Models\IssuedBook;
use App\Models\Member;
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
    public function it_can_get_issue_books_of_given_member()
    {
        $ankit = factory(Member::class)->create();
        $vishal = factory(Member::class)->create();

        $book1 = factory(IssuedBook::class)->create([
            'member_id' => $ankit->id,
        ]);

        $book2 = factory(IssuedBook::class)->create([
            'member_id' => $vishal->id,
        ]);

        $members = IssuedBook::ofMember($book1->member_id)->get();
        $this->assertCount(1, $members);

        $firstMember = $members->first();
        $this->assertEquals($book1->id, $firstMember->id);
        $this->assertEquals($book1->member_id, $firstMember->member_id);
    }

    /** @test */
    public function it_can_retrieve_only_reserve_books()
    {
        $book1 = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_RESERVED,
        ]);

        $book2 = factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_RETURNED,
        ]);

        $books = IssuedBook::reserve()->get();
        $this->assertCount(1, $books);

        /** @var IssuedBook $firstBook */
        $firstBook = $books->first();
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $firstBook->status);
    }
}