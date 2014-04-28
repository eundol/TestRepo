** 작성자 : 은희성

본 개선된 쿼리는 기본 gerrit DB의 changes 테이블에 inweek칼럼추가후 사용할 수 있다.
또 created_on 칼럼의 update_current default속성을 제거해야 한다.

그 후 inweek칼럼을 

update changes c set inweek = (select w.week from master_week w where c.created_on between w.start and w.end);

를 이용하여 추가



참고 : 테이블 create 코드
CREATE TABLE `changes` (
	`change_key` VARCHAR(60) NOT NULL DEFAULT '' COLLATE 'utf8_bin',
	`created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`last_updated_on` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
	`sort_key` VARCHAR(16) NOT NULL DEFAULT '' COLLATE 'utf8_bin',
	`owner_account_id` INT(11) NOT NULL DEFAULT '0',
	`dest_project_name` VARCHAR(255) NOT NULL DEFAULT '' COLLATE 'utf8_bin',
	`dest_branch_name` VARCHAR(255) NOT NULL DEFAULT '' COLLATE 'utf8_bin',
	`open` CHAR(1) NOT NULL DEFAULT 'N',
	`status` CHAR(1) NOT NULL DEFAULT '',
	`nbr_patch_sets` INT(11) NOT NULL DEFAULT '0',
	`current_patch_set_id` INT(11) NOT NULL DEFAULT '0',
	`subject` VARCHAR(255) NOT NULL DEFAULT '' COLLATE 'utf8_bin',
	`topic` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`last_sha1_merge_tested` VARCHAR(40) NULL DEFAULT NULL COLLATE 'utf8_bin',
	`mergeable` CHAR(1) NOT NULL DEFAULT 'N',
	`row_version` INT(11) NOT NULL DEFAULT '0',
	`change_id` INT(11) NOT NULL DEFAULT '0',
	`inweek` INT(10) NULL DEFAULT NULL,
	PRIMARY KEY (`change_id`),
	INDEX `changes_byOwnerOpen` (`open`, `owner_account_id`, `created_on`, `change_id`),
	INDEX `changes_byOwnerClosed` (`open`, `owner_account_id`, `last_updated_on`),
	INDEX `changes_submitted` (`status`, `dest_project_name`, `dest_branch_name`, `last_updated_on`),
	INDEX `changes_allOpen` (`open`, `sort_key`),
	INDEX `changes_byProjectOpen` (`open`, `dest_project_name`, `sort_key`),
	INDEX `changes_byProject` (`dest_project_name`),
	INDEX `changes_allClosed` (`open`, `status`, `sort_key`),
	INDEX `changes_byBranchClosed` (`status`, `dest_project_name`, `dest_branch_name`, `sort_key`),
	INDEX `changes_key` (`change_key`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;
