
using System.Data;
using System.Data.SqlClient;

public class SqlService
{
	private SqlConnection conn;
	private SqlDataAdapter adapter;
	private SqlCommand command;
	private string connectionstring;
	public SqlService(string strConn)
	{
		connectionstring = strConn;
		conn = new SqlConnection(connectionstring);
		command = conn.CreateCommand();
		adapter = new SqlDataAdapter();
		adapter.SelectCommand = command;
	}
	public SqlParameterCollection Parameters
	{
		get
		{
			if (this.command == null)
				return null;

			return this.command.Parameters;
		}
		set
		{
			if (this.command == null)
				return;

			this.command.Parameters.Clear();
			foreach (SqlParameter param in value)
			{
				this.command.Parameters.Add(param);
			}
		}
	}
	public void Open()
	{
		if (conn.State != ConnectionState.Open)
			try
			{
				conn.Open();
			}
			catch (Exception ex)
			{
				throw ex;
			}
	}

	public void Close()
	{
		if (conn.State != ConnectionState.Closed)
			try
			{
				conn.Close();
			}
			catch (Exception ex)
			{
				throw ex;
			}
	}

	public DataTable GetDataTable(string commmandText, CommandType commandType, bool autoOpenConnection, bool autoCloseConnection, ref Exception exception)
	{
		command.CommandText = commmandText;
		command.CommandType = commandType;

		DataTable dt = new DataTable();

		try
		{
			if (autoOpenConnection)
				Open();

			adapter.Fill(dt);

			if (autoCloseConnection)
				Close();
		}
		catch (Exception ex)
		{
			exception = ex;
			return null;
		}

		return dt;
	}

	public DataTable GetDataTable(string commmandText, CommandType commandType, ref Exception ex)
	{
		return GetDataTable(commmandText, commandType, false, false, ref ex);
	}

	public DataTable GetDataTable(string storedName, ref Exception ex)
	{
		return GetDataTable(storedName, CommandType.StoredProcedure, ref ex);
	}

	public void ClearParameters()
	{
		command.Parameters.Clear();
	}

	public void AddParameter(string name, object value)
	{
		command.Parameters.AddWithValue(name, value);
	}

	public void AddParameter(string name, object value, ParameterDirection direction)
	{
		command.Parameters.AddWithValue(name, value);
		command.Parameters[name].Direction = direction;
	}

	public void AddParameter(string name, object value, int size, ParameterDirection direction)
	{
		command.Parameters.AddWithValue(name, value);
		command.Parameters[name].Direction = direction;
		command.Parameters[name].Size = size;
	}

	public object GetParammeterValue(string parameterName)
	{
		return command.Parameters[parameterName].Value;
	}

	public void ExecuteQuery(string commandText, CommandType type, bool autoOpenConnection, bool autoCloseConnection)
	{
		try
		{
			if (autoOpenConnection)
				Open();

			command.CommandText = commandText;
			command.CommandType = type;
			command.ExecuteNonQuery();

			if (autoCloseConnection)
				Close();
		}
		catch (Exception ex)
		{
			throw ex;
		}
	}

	public void ExecuteQuery(string commandText, CommandType type, bool autoOpenConnection, bool autoCloseConnection, ref Exception exception)
	{
		try
		{
			if (autoOpenConnection)
				Open();

			command.CommandText = commandText;
			command.CommandType = type;
			command.ExecuteNonQuery();

			if (autoCloseConnection)
				Close();
		}
		catch (Exception ex)
		{
			exception = ex;
		}
	}
}
