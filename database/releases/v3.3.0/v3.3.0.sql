alter table `genres` add `show_on_landing_page` tinyint(1) not null default '0';

create table `about_us_cards` (`id` int unsigned not null auto_increment primary key, `title` varchar(191) not null, `description` text null, `is_active` tinyint(1) not null default '1', `created_at` timestamp null, `updated_at` timestamp null) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

insert into `homepage_settings` (`key`, `value`, `display_name`, `updated_at`, `created_at`) values (
        'hero_image_title',
        'Hero image title 1',
        'Hero Image Title',
        '2020-09-22 00:00:00',
        '2020-09-22 00:00:00'
);

insert into `homepage_settings` (`key`, `value`, `display_name`, `updated_at`, `created_at`) values (
        'hero_image_description',
        'This is Hero image Description.',
        'Hero Image Description',
        '2020-09-22 00:00:00',
        '2020-09-22 00:00:00'
);

insert into `homepage_settings` (`key`, `value`, `display_name`, `updated_at`, `created_at`) values (
        'about_us_text',
        'An About Us page helps your company make a good first impression, and is critical for building customer trust and loyalty.',
        'About us Text',
        '2020-09-22 00:00:00',
        '2020-09-22 00:00:00'
);

insert into `homepage_settings` (`key`, `value`, `display_name`, `updated_at`, `created_at`) values (
        'genres_text', 
        'Art', 
        'Genres Text',
        '2020-09-22 00:00:00',
        '2020-09-22 00:00:00'
);
  
insert into `homepage_settings` (`key`, `value`, `display_name`, `updated_at`, `created_at`) values (
        'popular_books_text',
        'Innovation', 
        'Popular Books Text',
        '2020-09-22 00:00:00',
        '2020-09-22 00:00:00'
);
   
