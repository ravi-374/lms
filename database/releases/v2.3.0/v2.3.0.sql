 create table `personal_access_tokens`
  (
    `id` bigint unsigned not null auto_increment primary key, 
    `tokenable_type` varchar(191) not null, 
    `tokenable_id` bigint unsigned not null,
     `name` varchar(191) not null,
      `token` varchar(64) not null, 
      `abilities` text null, 
      `last_used_at` timestamp null,
       `created_at` timestamp null,
        `updated_at` timestamp null
    ) default character set utf8mb4 collate 'utf8mb4_unicode_ci';

alter table `personal_access_tokens` add index `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type`, `tokenable_id`);

alter table `personal_access_tokens` add unique `personal_access_tokens_token_unique`(`token`);

