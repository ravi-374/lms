alter table `penalties` drop foreign key `penalties_book_item_id_foreign`;

alter table `penalties` add constraint `penalties_book_item_id_foreign` foreign key (`book_item_id`) references `book_items` (`id`) on delete cascade on update cascade;

alter table `penalties` drop foreign key `penalties_collected_by_foreign`;

alter table `penalties` add constraint `penalties_collected_by_foreign` foreign key (`collected_by`) references `users` (`id`) on delete cascade on update cascade;
