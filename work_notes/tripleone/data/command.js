
var gameCommandList = [
	{
		"tag" : "rebuild_totals",
		"name" : "Rebuild Total",
		"command" : "sudo ./command.sh rebuild_totals '2018-11-01 00:00:00' '2018-11-15 23:59:59' true true",
		"description" : "Transfer game_logs data in totals table. Use to update withdraw condition bet",
	},
	{
		"tag" : "sync_merge_game_logs",
		"name" : "Sync Merge Game Logs",
		"command" : "sudo ./command.sh sync_game_logs 'false' '2018-10-01 00:00:00' '2018-10-11 23:59:59' '232' 60 '_null' 'true' 'false'",
		"description" : "Sync merge game logs. Make sure md5_sum is cleared when running this function"
	},
	{
		"tag" : "sync_original_game_logs_anytime",
		"name" : "Sync Orignal Game Logs Anytime",
		"command" : "sudo ./command.sh sync_original_game_logs_anytime '820' '2018-11-07 00:00:00' '2018-11-07 23:59:59'",
		"description" : "Sync Original Logs Anytime"
	},
	{
		"tag" : "sync_gateway",
		"name" : "Sync Game Gateway",
		"command" : "sudo ./command.sh sync_t1_gamegateway '2018-08-01 00:00:00' '2018-09-30 23:59:59'",
		"description" : "Sync gateway game_logs to client game_logs"
	},
	{
		"tag" : "transfer_game_balance_to_main_wallet",
		"name" : "Transfer Game Balance to Main",
		"command" : "sudo ./command.sh transfer_all_players_subwallet_to_main_wallet 8 1",
		"description" : ""
	},
	{
		"tag" : "rebuild_single_game_by_timelimit",
		"name" : "Rebuild Single Game",
		"command" : "sudo ./command.sh rebuild_single_game_by_timelimit 484 '2018-10-20 00:00:00' '2018-22-22 23:59:59' '1' 'test002'",
		"description" : ""
	},
	{
		"tag" : "sync_gateway_game_list",
		"name" : "Sync Gateway Game List",
		"command" : "sudo ./sync.sh sync_game_provider_game_list t1-evolution_api",
		"description" : ""
	},
	{
		"tag" : "sync_game_list",
		"name" : "Sync Game List in Client",
		"command" : "sudo ./command.sh sync_game_list",
		"description" : ""
	},
	{
		"tag" : "sync_merge_debug",
		"name" : "Sync Merge Game (use for debugging)",
		"command" : "sudo ./command.sh sync_merge_game_logs_anytime 154 '2018-11-13 00:00:00' '2018-11-23 23:59:59'",
		"description" : "Sync merge game logs. Use for debugging"
	},
];

