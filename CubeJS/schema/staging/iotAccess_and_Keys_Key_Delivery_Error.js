cube(`stg_iot_Access_and_Keys_Key_Delivery_Error`, {
    sql: `
    SELECT COUNT(DISTINCT pacs.id),
       ddt.apartment_community_id
    FROM ${raw_iot_pacs_transaction.sql()} pacs         
            JOIN ${raw_iot_pacs_transaction_lock_database_transaction.sql()} dbToPacs ON pacs.id = dbToPacs.pacs_transaction_id         
            JOIN ${raw_iot_lock_database_transaction.sql()}  db ON db.id = dbToPacs.lock_database_transaction_id         
            JOIN ${raw_iot_device_database_transaction.sql()} ddt ON ddt.id = db.id
            JOIN ${raw_iot_device_database_transaction.sql()} lastTransaction ON lastTransaction.id =
                (
                    SELECT DISTINCT ON (tx.lock_id) tx.id
                    FROM ${raw_iot_device_database_transaction.sql()} dd
                    JOIN ${raw_iot_lock_database_transaction.sql()} tx ON dd.id = tx.id
                    WHERE tx.lock_id = db.lock_id AND tx.command_name != 'READ_CONFIG'
                    ORDER BY tx.lock_id, dd.start_date DESC
                )
            WHERE pacs.status = 'COMMUNICATION_ERROR'
                AND (
                    (lastTransaction.id = db.id AND lastTransaction.status = 'COMMUNICATION_ERROR')
                    OR
                    (db.command_name = 'READ_CONFIG' AND ddt.status = 'COMMUNICATION_ERROR')
                )
    GROUP BY ddt.apartment_community_id
      `,    
        
    measures: {
    },
    
    dimensions: {
      
    },
    
    dataSource: `postgres_iot`
  });