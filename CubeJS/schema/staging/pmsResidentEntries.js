cube(`stg_pms_residentEntries`, {
  sql: `
  SELECT p.account_id
				,d.business_unit_id
        		,p.payment_date AS post_date
				,NULL AS code
				,d.reference
				,payment_amount AS credit
				,NULL AS charge
			FROM ${raw_pmsaccounting_payment.sql()} p
			LEFT JOIN ${raw_pmsaccounting_deposit.sql()} d ON d.deposit_id = p.deposit_id
			UNION			
			SELECT ch.account_id
				,c.community_id AS business_unit_id
        		,ch.post_date AS post_date
				,c.name AS code
				,ch.reference
				,NULL AS credit
				,ch.amount AS charge
			FROM ${raw_pmsaccounting_charge.sql()} ch
			LEFT JOIN ${raw_pmsaccounting_code.sql()} c ON c.id = ch.code_id
  `,
    

  dataSource: `snowflake_pms`
});