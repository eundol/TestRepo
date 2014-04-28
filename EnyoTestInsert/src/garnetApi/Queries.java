package garnetApi;

public class Queries {
	
	public static String insertVersion = "insert into TB_Garnet_API_Version values (null, ?, null)";
	public static String getVersionId = "select version_id from TB_Garnet_API_Version where version = ?";
	public static String insertApiInfo = "insert into TB_Garnet_API values (?, null, ?, ?, ?, null)";
	public static String getApiId = "select api_id from TB_Garnet_API where version_id = ? and name = ?";
	public static String insertApiInfoPublic = "insert into TB_Garnet_API_Public values (?, ?, ?, ?, ?, null)";
}