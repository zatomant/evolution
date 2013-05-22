<?php
/**
 * MODx language File
 *
 * @author davaeron
 * @package MODx
 * @version 1.0
 * 
 * Filename:       /install/lang/hebrew/hebrew.inc.php
 * Language:       Hebrew
 * Encoding:       UTF-8
 */
$modx_textdir = 'rtl';

$_lang["alert_database_test_connection"] = 'You need to create your database or test the selection of your database!';
$_lang["alert_database_test_connection_failed"] = 'The test of your database selection has failed!';
$_lang["alert_enter_adminconfirm"] = 'The administrator password and the confirmation don\'t match!';
$_lang["alert_enter_adminlogin"] = 'You need to enter a username for the system admin account!';
$_lang["alert_enter_adminpassword"] = 'You need to enter a password for the system admin account!';
$_lang["alert_enter_database_name"] = 'You need to enter a value for database name!';
$_lang["alert_enter_host"] = 'You need to enter a value for database host!';
$_lang["alert_enter_login"] = 'You need to enter your database login name!';
$_lang["alert_server_test_connection"] = 'You need to test your server connection!';
$_lang["alert_server_test_connection_failed"] = 'The test of your server connection has failed!';
$_lang["alert_table_prefixes"] = 'Table prefixes must start with a letter!';
$_lang["all"] = 'הכל';
$_lang["and_try_again"] = ', and try again. If you need help figuring out how to fix the problem';
$_lang["and_try_again_plural"] = ', and try again. If you need help figuring out how to fix the problems';
$_lang["begin"] = 'התחל';
$_lang["btnback_value"] = 'חזרה';
$_lang["btnclose_value"] = 'סגור';
$_lang["btnnext_value"] = 'הבא';
$_lang["cant_write_config_file"] = 'MODx couldn\'t write the config file. Please copy the following into the file ';
$_lang["cant_write_config_file_note"] = 'Once that\'s been done, you can log into MODx Admin by pointing your browser at YourSiteName.com/'.MGR_DIR.'/.';
$_lang["checkbox_select_options"] = 'אפשרויות שדה סימון:';
$_lang["checking_if_cache_exist"] = 'Checking if <span class=\"mono\">assets/cache</span> directory exists: ';
$_lang["checking_if_cache_file2_writable"] = 'Checking if <span class=\"mono\">assets/cache/sitePublishing.idx.php</span> file is writable: ';
$_lang["checking_if_cache_file_writable"] = 'Checking if <span class=\"mono\">assets/cache/siteCache.idx.php</span> file is writable: ';
$_lang["checking_if_cache_writable"] = 'Checking if <span class=\"mono\">assets/cache</span> directory is writable: ';
$_lang["checking_if_config_exist_and_writable"] = 'Checking if <span class=\"mono\">'.MGR_DIR.'/includes/config.inc.php</span> exists and is writable: ';
$_lang["checking_if_export_exists"] = 'Checking if <span class=\"mono\">assets/export</span> directory exists: ';
$_lang["checking_if_export_writable"] = 'Checking if <span class=\"mono\">assets/export</span> directory is writable: ';
$_lang["checking_if_images_exist"] = 'Checking if <span class=\"mono\">assets/images</span> directory exists: ';
$_lang["checking_if_images_writable"] = 'Checking if <span class=\"mono\">assets/images</span> directory is writable: ';
$_lang["checking_mysql_strict_mode"] = 'Checking MySQL for strict sql_mode: ';
$_lang["checking_mysql_version"] = 'Checking MySQL version: ';
$_lang["checking_php_version"] = 'Checking PHP version: ';
$_lang["checking_registerglobals"] = 'Checking if Register_Globals is off: ';
$_lang["checking_registerglobals_note"] = 'This configuration makes your site much more susceptible to Cross Site Scripting (XSS) attacks. You should speak to your host about disabling this setting, usually by one of three ways: modifying the global php.ini file, adding rules to a .htaccess file in the root of your MODx install, or adding custom php.ini override files in every directory on your install (and there\'s a lot of them). You will still be able to install MODx, but consider yourself warned.'; //Look at changing this to provide a solution.
$_lang["checking_sessions"] = 'Checking if sessions are properly configured: ';
$_lang["checking_table_prefix"] = 'Checking table prefix ';
$_lang["chunks"] = 'מיני תבניות';
$_lang["config_permissions_note"] = 'For new Linux/Unix installs, please create a blank file named <span class=\"mono\">config.inc.php</span> in the <span class=\"mono\">'.MGR_DIR.'/includes/</span> directory with file permissions set to 0666.';
$_lang["connection_screen_character_set"] = 'חיבור ערכת תווים:';
$_lang["connection_screen_collation"] = 'אוסף נתונים:';
$_lang["connection_screen_connection_information"] = 'מידע התחברות';
$_lang["connection_screen_connection_method"] = 'שיטת התחברות:';
$_lang["connection_screen_database_connection_information"] = 'מידע אודות מסד הנתונים';
$_lang["connection_screen_database_connection_note"] = 'נא להזין את שם מסד הנתונים שנוצר עבור MODX. אם אין עדיין מסד נתונים, תוכנת ההתקנה תנסה ליצור מסד נתונים עבורך. תהליך זה עלול להיכשל בהתאם לתצורת MySQL   או הרשאות משתמש עבור שם המתחם /התקנה.';
$_lang["connection_screen_database_host"] = 'שרת מסד הנתונים:';
$_lang["connection_screen_database_login"] = 'שם התחברות למסד הנתונים:';
$_lang["connection_screen_database_name"] = 'שם מסד הנתונים:';
$_lang["connection_screen_database_pass"] = 'סיסמת מסד הנתונים:';
$_lang["connection_screen_database_test_connection"] = 'לחץ כאן כדי ליצור את מסד הנתונים או כדי לבדוק את הבחירה של מסד הנתונים';
$_lang["connection_screen_default_admin_email"] = 'דואל מנהל המערכת:';
$_lang["connection_screen_default_admin_information"] = 'מידע אודות מנהל המערכת';
$_lang["connection_screen_default_admin_login"] = 'שם משתמש למנהל המערכת:';
$_lang["connection_screen_default_admin_note"] = 'עכשיו תצטרך להזין מספר פרטים של חשבון המנהל הראשי. אתה יכול למלא את השם כאן, וסיסמה שלא סביר שתשכח. תצטרך פרטים אלו להתחברות למערכת הניהול לאחר סיום ההתקנה.';
$_lang["connection_screen_default_admin_password"] = 'סיסמת מנהל המערכת:';
$_lang["connection_screen_default_admin_password_confirm"] = 'אימות סיסמא:';
$_lang["connection_screen_default_admin_user"] = 'ברירת מחדל משתמש מנהל מערכת';
$_lang["connection_screen_server_connection_information"] = 'חיבור לשרת ופרטי התחברות';
$_lang["connection_screen_server_connection_note"] = 'נא להזין את שם השרת, שם המשתמש שלך ואת הסיסמה שלך ולאחר מכן לבדוק את ההתחברות לשרת.';
$_lang["connection_screen_server_test_connection"] = 'לחץ כאן כדי לבדוק את השרת ולקבל את אוספי התווים הזמינים';
$_lang["connection_screen_table_prefix"] = 'קידומת טבלה:';
$_lang["creating_database_connection"] = 'יוצר חיבור למסד הנתונים: ';
$_lang["database_alerts"] = 'התראות מסד הנתונים!';
$_lang["database_connection_failed"] = 'התחברות למסד הנתונים נכשלה!';
$_lang["database_connection_failed_note"] = 'אנא בדוק את פרטי ההתחברות למסד הנתונים ונסה שוב.';
$_lang["database_use_failed"] = 'מסד הנתונים לא ניתן לבחירה!';
$_lang["database_use_failed_note"] = 'Please check the database permissions for the specified user and try again.';
$_lang["during_execution_of_sql"] = ' during the execution of SQL statement ';
$_lang["encoding"] = 'UTF-8';	//charset encoding for html header
$_lang["error"] = 'שגיאה';
$_lang["errors"] = 'שגיאות';
$_lang["failed"] = 'נכשל!';
$_lang["iagree_box"] = 'אני מסכים לתנאים שהוצגו ברשיון זה.';
$_lang["install"] = 'התקן';
$_lang["install_overwrite"] = 'התקנה/דריסה';
$_lang["install_results"] = 'תוצאות התקנה';
$_lang["install_update"] = 'התקנה/עדכון';
$_lang["installation_error_occured"] = 'השגיאות הבאות התגלו במהלך ההתקנה';
$_lang["installation_install_new_copy"] = 'התקנת עותק חדש של ';
$_lang["installation_install_new_note"] = 'שים לב, אפשרות זו עלולה להחליף את כל הנתונים בתוך מסד הנתונים.';
$_lang["installation_mode"] = 'מצב התקנה';
$_lang["installation_new_installation"] = 'התקנה חדשה';
$_lang["installation_note"] = '<strong>הערה:</strong> לאחר ההתחברות הראשונית למערכת הניהול עליך לעדכן את הגדרות האתר.';
$_lang["installation_successful"] = 'ההתקנה בוצעה בהצלחה!';
$_lang["installation_upgrade_advanced"] = 'שדרוג התקנה קיימת מתקדמת<br /><small>(עריכת הגדרות מסד נתונים)</small>';
$_lang["installation_upgrade_advanced_note"] = 'עבור מנהלים מתקדמים או לעוברים לשרתים אחרים בעלי נתוני חיבור שונים. <b> מצריך פרטים אודות שם מסד הנתונים, שם משתמש, סיסמה ופרטי התחברות מלאים.</b>';
$_lang["installation_upgrade_existing"] = 'שדרוג התקנה קיימת';
$_lang["installation_upgrade_existing_note"] = 'שדרוג קבצים ומסד נתונים נוכחים.';
$_lang["installed"] = 'הותקן';
$_lang["installing_demo_site"] = 'התקנת אתר דוגמא: ';
$_lang["language_code"] = 'he';	// for html element e.g. <html xml:lang="en" lang="en">
$_lang["loading"] = 'טוען...';
$_lang["modules"] = 'מודולים';
$_lang["modx_footer1"] = '&copy; 2005-2011 the <a href="http://www.modxcms.com/" target="_blank" style="color: green; text-decoration:underline">MODx</a> Content Mangement Framework (CMF) project. All rights reserved. MODx is licensed under the GNU GPL.';
$_lang["modx_footer2"] = 'MODx is free software.  We encourage you to be creative and make use of MODx in any way you see fit. Just make sure that if you do make changes and decide to redistribute your modified MODx, that you keep the source code free!';
$_lang["modx_install"] = 'MODx &raquo; Install';
$_lang["modx_requires_php"] = ', and MODx requires PHP 4.2.0 or later';
$_lang["mysql_5051"] = ' MySQL server version is 5.0.51!';
$_lang["mysql_5051_warning"] = 'There are known issues with MySQL 5.0.51. It is recommended that you upgrade before continuing.';
$_lang["mysql_version_is"] = ' Your MySQL version is: ';
$_lang["none"] = 'ללא';
$_lang["not_found"] = 'לא נמצא';
$_lang["ok"] = 'תקין!';
$_lang["optional_items"] = 'פריטים אופצוינאלים';
$_lang["optional_items_note"] = 'אנא בחר את אפשרויות ההתקנה שלך ולחץ על התקן:';
$_lang["php_security_notice"] = '<legend>Security notice</legend><p>While MODx will work on your PHP version, usage of MODx on this version is not recommended. Your version of PHP is vulnerable to numerous security holes. Please upgrade to PHP version is 4.3.8 or higher, which patches these holes. It is recommended you upgrade to this version for the security of your own website.</p>';
$_lang["please_correct_error"] = '. Please correct the error';
$_lang["please_correct_errors"] = '. Please correct the errors';
$_lang["plugins"] = 'התקנים';
$_lang["preinstall_validation"] = 'אימות לפני התקנה';
$_lang["remove_install_folder_auto"] = 'מחק את תיקיית התתקנה מהאתר <br />&nbsp;(פעולה זו מצריכה הרשאת מחיקה).';
$_lang["remove_install_folder_manual"] = 'אנא זכור להסיר את &quot;<b>תקיית ההתקנה</b>&quot; לפני כניסתך למערכת הניהול.';
$_lang["retry"] = 'נסה שוב';
$_lang["running_database_updates"] = 'Running database updates: ';
$_lang["running_setup_script"] = 'Running setup script... please wait';
$_lang["sample_web_site"] = 'אתר אינטרנט לדוגמא';
$_lang["sample_web_site_note"] = 'יש לקחת בחשבון כי פעולה זו <b style=\"color:#CC0000\">דורסת</b> מסמכים ומשאבים קיימים.';
$_lang["setup_cannot_continue"] = 'Unfortunately, Setup cannot continue at the moment, due to the above ';
$_lang["setup_couldnt_install"] = 'MODx setup couldn\'t install/alter some tables inside the selected database.';
$_lang["setup_database"] = 'מערכת ההתקנה תנסה כעת להתקין את מסד הנתונים:<br />';
$_lang["setup_database_create_connection"] = 'Creating connection to the database: ';
$_lang["setup_database_create_connection_failed"] = 'Database connection failed!';
$_lang["setup_database_create_connection_failed_note"] = 'Please check the database login details and try again.';
$_lang["setup_database_creating_tables"] = 'יצירת טבלאות מסד נתונים: ';
$_lang["setup_database_creation"] = 'יצירת מסד נתונים `';
$_lang["setup_database_creation_failed"] = 'יצירת מסד נתונים נכשלה!';
$_lang["setup_database_creation_failed_note"] = ' - Setup could not create the database!';
$_lang["setup_database_creation_failed_note2"] = 'Setup could not create the database, and no existing database with the same name was found. It is likely that your hosting provider\'s security does not allow external scripts to create a database. Please create a database according to your hosting provider\'s procedure, and run Setup again.';
$_lang["setup_database_selection"] = 'בחירת מסד נתונים `';
$_lang["setup_database_selection_failed"] = 'בחירת מסד נתונים נכשלה...';
$_lang["setup_database_selection_failed_note"] = 'The database does not exist. Setup will attempt to create it.';
$_lang["snippets"] = 'קטעי קוד';
$_lang["some_tables_not_updated"] = 'Some tables were not updated. This might be due to previous modifications.';
$_lang["status_checking_database"] = 'בודק מסד נתונים: ';
$_lang["status_connecting"] = 'חיבור לשרת: ';
$_lang["status_failed"] = 'נכשל!';
$_lang["status_failed_could_not_create_database"] = 'נכשל - לא ניתן ליצור את מסד הנתונים';
$_lang["status_failed_could_not_select_database"] = 'נכשל - לא ניתן לבחור את מסד הנתונים';
$_lang["status_failed_database_collation_does_not_match"] = 'נכשל - אוסף הנתונים לא תואם; השתמש ב SET NAMES או בחר %s';
$_lang["status_failed_table_prefix_already_in_use"] = 'failed - table prefix already in use!';
$_lang["status_passed"] = 'עבר - מסד נתונים נבחר';
$_lang["status_passed_database_created"] = 'עבר - יצירת מסד נתונים';
$_lang["status_passed_server"] = 'עבר - אוסף נתונים זמין';
$_lang["strict_mode"] = ' MySQL server strict sql_mode is enabled!';
$_lang["strict_mode_error"] = 'Certain features of MODx may not work properly unless the STRICT_TRANS_TABLES sql_mode is disabled. You can set the MySQL mode by editing the my.cnf file or contact your server administrator.';
$_lang["summary_setup_check"] = 'מערכת ההתקנה ביצעה מספר בדיקות על מנת לודא כי ניתן להמשיך בהתקנה.';
$_lang["table_prefix_already_inuse"] = ' - Table prefix is already in use in this database!';
$_lang["table_prefix_already_inuse_note"] = 'Setup couldn\'t install into the selected database, as it already contains tables with the prefix you specified. Please choose a new table prefix, and run Setup again.';
$_lang["table_prefix_not_exist"] = ' - Table prefix does not exist in this database!';
$_lang["table_prefix_not_exist_note"] = 'Setup couldn\'t install into the selected database, as it does not contain existing tables with the prefix you specified to be upgraded. Please choose an existing table prefix, and run Setup again.';
$_lang["templates"] = 'תבניות עיצוב';
$_lang["testing_connection"] = 'בודק חיבור...';
$_lang["to_log_into_content_manager"] = 'על מנת להתחבר למערכת הניהול ('.MGR_DIR.'/index.php) ניתן ללחוץ על כפתור `סגור`.';
$_lang["toggle"] = 'בחירה הפוכה';
$_lang["unable_install_chunk"] = 'Unable to install chunk.  File';
$_lang["unable_install_module"] = 'Unable to install module.  File';
$_lang["unable_install_plugin"] = 'Unable to install plugin.  File';
$_lang["unable_install_snippet"] = 'Unable to install snippet.  File';
$_lang["unable_install_template"] = 'Unable to install template.  File';
$_lang["upgrade_note"] = '<strong>הערה:</strong> לפני גלישה באתר יש להכנס למערכת הניהול לבדוק את ההגדרות ולשמור אותן.';
$_lang["upgraded"] = 'שודרג';
$_lang["visit_forum"] = ', בקרו ב <a href="http://modxcms.com/forums/index.php/board,360.0.html" target="_blank">פורומים בעברית</a>.';
$_lang["warning"] = 'אזהרה!';
$_lang["welcome_message_select_begin_button"] = 'בחר בכפתור התחל להתחלת ההתקנה:';
$_lang["welcome_message_text"] = 'תוכנה זו תלווה אתכם בהמשך תהליך ההתקנה.';
$_lang["welcome_message_welcome"] = 'ברוכים הבאים להתקנת MODx.';
$_lang["writing_config_file"] = 'יוצר קובץ הגדרות: ';
$_lang["you_running_php"] = ' - אתה רץ על PHP ';
?>