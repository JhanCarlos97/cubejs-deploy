cube(`bus_pms_AmenitiesByApartment`, {
    sql: `
    with pre_cte as (
        select
        occupancy.BUSINESS_UNIT_ID,
        UT.NAME as UNIT_TYPE,
		U.c_unit_name as UNIT_NAME,
        null as AMENITY_GROUP_NAME,
		a.NAME AS AMENITY_NAME,
		a.DESCRIPTION as AMENITY_DESCRIPTION,
		ca.TOTAL AS AMENITY_VALUE
		from ${raw_pmscbr_unitTypes.sql()} UT
        LEFT JOIN ${raw_pmscbr_unitSpecsInfo.sql()} SI ON UT.ID = SI.UNIT_TYPE_ID
        LEFT JOIN ${raw_pmsleasing_occupancy.sql()} occupancy ON UT.COMMUNITY_ID = occupancy.business_unit_id
        LEFT JOIN ${raw_pmsleasing_unit.sql()} U ON SI.UNIT_ID = U.UNIT_ID and U.BUSINESS_UNIT_ID = occupancy.business_unit_id
        LEFT JOIN ${raw_pmsamnt_commAmnt.sql()} CA ON UT.COMMUNITY_ID = CA.COMMUNITY_ID
        LEFT JOIN ${raw_pmsamnt_Amnt.sql()} A on A.ID = CA.AMENITY_ID
        Where UT.DELETED_AT is null
        and SI.BUILDING_ID is not null
        group by 1,2,3,4,5,6,7
        )
    select
        *,
        sum(AMENITY_VALUE) over (PARTITION BY BUSINESS_UNIT_ID,UNIT_TYPE,UNIT_NAME,AMENITY_GROUP_NAME) AS TOTAL_AMENITY_VALUE
        from pre_cte
        `,
    
    dimensions: {
    
        businessUnitId: {
            sql: `${CUBE}."BUSINESS_UNIT_ID"`,                
            type: `string`,
            title: `BusinessUnit`
        },

        unitName: {
            sql: ` ${CUBE}."UNIT_NAME"`,                 
            type: `string`,
            title: `Unit`,
            meta: {
                styleType: 'string',
                show: false,
                size: 135,
                sortable: true,
                showOnHeaderBox: true,
                showLabelOnHeaderBox: true,
                isGroupIdentifier: true
            },
        },

        unitType: {
            sql: ` ${CUBE}."UNIT_TYPE"`,                 
            type: `string`,
            title: `Unit type`,
            meta: {
                styleType: 'string',
                show: false,
                size: 135,
                sortable: true,
                showOnHeaderBox: true,
                showLabelOnHeaderBox: true,
                filterPosition: 'key,label'
            },
        },

        amenityGroupName: {
            sql: ` ${CUBE}."AMENITY_GROUP_NAME"`,                 
            type: `string`,
            title: `Amenity Group`,
            meta: {
                styleType: 'string',
                show: false,
                size: 135,
                sortable: true
            },
        },

        amenityName: {
            sql: ` ${CUBE}."AMENITY_NAME"`,                 
            type: `string`,
            title: `Amenity`,
            meta: {
                styleType: 'string',
                show: true,
                size: 350,
                sortable: true
            },
        },

        amenityDescription: {
            sql: ` ${CUBE}."AMENITY_DESCRIPTION"`,                 
            type: `string`,
            title: `Amenity Description`,
            meta: {
                styleType: 'string',
                show: true,
                size: 600,
                sortable: true
            },
        },

        amenityValue: {
            sql: ` ${CUBE}."AMENITY_VALUE"`,                 
            type: `number`,
            title: `Value`,
            meta: {
                styleType: 'money',
                show: true,
                size: 135,
                sortable: true
            },
        },

        totalAmenityValueByUnit: {
            sql: `${CUBE}."TOTAL_AMENITY_VALUE"`,                 
            type: `number`,
            title: `Total Amenity Value By Unit`,
            meta: {
                styleType: 'money',
                show: false,
                size: 135,
                sortable: true,
                isGroupTotal: true
            },
        },
    },
    
    dataSource: `snowflake_pms`

    }
);
