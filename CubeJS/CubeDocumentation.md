Table of Contents
=================

- [Table of Contents](#table-of-contents)
- [What is Cube.js](#what-is-cubejs)
- [How do I build cubes](#how-do-i-build-cubes)
  - [Cube schema](#cube-schema)
  - [Cube payload](#cube-payload)
  - [Cube properties](#cube-properties)
    - [Joins](#joins)
    - [Dimensions and measures](#dimensions-and-measures)
    - [Segments](#segments)
    - [Cube properties naming](#cube-properties-naming)
    - [Filters](#filters)
    - [Data source](#data-source)
    - [Other cube payload properties](#other-cube-payload-properties)
  - [Cube playground](#cube-playground)
- [Cube.js company guidelines](#cubejs-company-guidelines)
  - [js files naming](#js-files-naming)
  - [Schemas layers](#schemas-layers)
    - [Raw layer](#raw-layer)
    - [Staging layer](#staging-layer)
    - [Business layer](#business-layer)
  - [Using Cube functions](#using-cube-functions)
  - [Using Cube variables](#using-cube-variables)
  - [Do not redefine properties](#do-not-redefine-properties)
- [Cube advanced concepts](#cube-advanced-concepts)
  - [Title and description parameters](#title-and-description-parameters)
  - [Join flow](#join-flow)
    - [Join limitations](#join-limitations)
  - [Pre-aggregations](#pre-aggregations)
  - [Joining different DBs](#joining-different-dbs)
  - [Filter parameters](#filter-parameters)
- [Help sources](#help-sources)
- [FAQ](#faq)

# What is Cube.js

It is a headless BI tool, which means:

- It has its own data modeling infrastructure that simplifies the dozens of SQLs you might have to supply an application/dashboard
- You can consume this infrastructure with a Rest API or with GraphQL
- It has a caching feature that allows you to save aggregations so you don’t have to run the same query every time in your DB
- You can join data between diferent databases
- It has an access control feature/multi tenancy, so a specific user can only access its own data, for instance

# How do I build cubes

For you to translate SQL reports into Cube data modeling, you need two things: A cube schema and a cube payload.

## Cube schema

A cube schema simply consists of table of data (that can be defined by any valid SQL), where you can define things such as measures, dimensions, joins and filters separately from the original SQL. This is really interesting because it brings a lot of flexibility to the process of running queries, because instead of you having to edit complex SQLs you just have to specify the parameter in a [cube payload](#cube-payload).


```js
cube(`Renewals`, {
    sql: `
    SELECT * FROM "leasing".occupancy_phase`,
    
    preAggregations: {
      renewalsPre: {
        dimensions: [ 
          Unit.cUnitName,
          UnitTypes.name,
          Groups.name,
          UnitTypes.bedBath,
          UnitSpecsInfo.squareFootage,
          Party.resident,
          Renewals.marketRentAtSign,
          Renewals.currentMarketRent,
          Renewals.oldRent,
          Renewals.newRent,
          Renewals.netChange,
          OccupancyPhase.currentRentAmount,
          Renewals.percentChange,
          Renewals.startDate,
          Renewals.term,
          Renewals.month,
          Renewals.monthGroup,
          Renewals.communityId],
       segments: [Renewals.leaseExpirationSegment],
    }
    },
    
    joins: {
  
      Occupancy: {
        sql: `${Renewals.occupancyId} = ${Occupancy.occupancyId}`,
        relationship: `belongsTo`
      },
  
      OccupancyRelationship: {
        sql: `${Renewals.occupancyId} = ${OccupancyRelationship.occupancyId} AND ${OccupancyRelationship.relationshipTypeName} = 'Resident'`,
        relationship: `belongsTo`
      },

      OccupancyPhase: {
        sql: `${Renewals.occupancyId} = ${OccupancyPhase.occupancyId} AND ${Renewals.occupancyPhaseIndex} - 1 = ${OccupancyPhase.occupancyPhaseIndex}`,
        relationship: `belongsTo`
      },
  
    },
    
    measures: {
    },
    
    dimensions: {
      occupancyId: {
        sql: `occupancy_id`,
        type: `string`,
        primaryKey: true,
        shown: true
      },
      occupancyPhaseIndex: {
        sql: `occupancy_phase_index`,
        type: `string`
      },

      occupancyPhaseType: {
        sql: `occupancy_phase_type`,
        type: `string`
      },
  
      marketRentAtSign: {
        sql: `(${Renewals}.total_amenity_amount_at_start + ${Renewals}.base_market_rent_rate_at_start)::numeric(10,2)`,
        type: `number`,
        title: `Market Rent at Sign`
      },

      currentMarketRent: {
        sql: `coalesce(${CALGrouped}.amenities_amount, 0) + ${UnitTypes}.current_base_rent`,
        type: `number`,
        title: `Current Market Rent`
      },

      oldRent: {
        sql: `(${Renewals}.total_amenity_amount_at_start + ${OccupancyPhase}.current_rent_amount)::numeric(10,2)`,
        type: `number`,
        title: `Old Rent`
      },

      newRent: {
        sql: `(${Renewals}.total_amenity_amount_at_start + ${Renewals}.current_rent_amount)::numeric(10,2)`,
        type: `number`,
        title: `New Rent`
      },

      netChange: {
        sql: `(${Renewals}.current_rent_amount - ${OccupancyPhase}.current_rent_amount)::numeric(10,2)`,
        type: `number`,
        title: `Net Change`
      },

      currentRentAmount: {
        sql: `${Renewals}.current_rent_amount::numeric(10, 2)`,
        type: `number`,
        title: `Net Change`
      },

      percentChange: {
        sql: `ROUND(((${Renewals}.current_rent_amount::numeric/NULLIF(${OccupancyPhase}.current_rent_amount::numeric, 0) * 100) - 100)::numeric, 2)`,
        type: `number`,
        title: `Percent Change`
      },
  
      startDate: {
        sql: `LOWER(${Renewals}.occupancy_phase_span)`,
        type: `time`,
        title: `Start Date`
      },

      currentLeaseExpirationDate: {
        sql: `current_lease_expiration_date`,
        type: `time`
      },

      term: {
        sql: `DATE_PART('years', AGE(${Renewals.currentLeaseExpirationDate} + 1, ${Renewals.startDate})) * 12 + DATE_PART('months', AGE(${Renewals.currentLeaseExpirationDate} + 1, ${Renewals.startDate}))`,
        type: `number`,
        title: `Term`
      },

      month: {
        sql: `CONCAT(DATE_PART('year', ${Renewals.startDate}),'/', date_part('month', ${Renewals.startDate}))`,
        type: `string`,
        title: `Month`
      },

      monthGroup: {
        sql: `
        CASE 
            WHEN DATE_PART('month', ${Renewals.startDate}) = DATE_PART('month', now()) THEN 'This Month'
            WHEN DATE_PART('month', ${Renewals.startDate}) = DATE_PART('month', now() - INTERVAL '1 months') THEN 'Last Month'
            WHEN DATE_PART('month', ${Renewals.startDate}) = DATE_PART('month', now() - INTERVAL '2 months') THEN 'Month Before Last'	
            else NULL 
        END`,
        type: `string`,
        title: `Month Group`
      },

      communityId: {
        sql: `business_unit_id`,
        type: `string`
      },

    },

    segments: {
        leaseExpirationSegment: {
            sql: `
            ${Renewals.startDate} BETWEEN DATE_TRUNC('month', now() - INTERVAL '11 months') AND DATE_TRUNC('month', now() + INTERVAL '1 months') - INTERVAL '1 days'
            and ${Renewals.occupancyPhaseType} = 'Renewal'`
        },
    },
    
    dataSource: `default`
  });
});
```
In the first part you define the cube schema name and what is its respective SQL. It is a good practice in Cube to always do a `Select * FROM` if you want to query just a single table. In that case, Cube will be able to access every column from that specific table. 

## Cube payload

A cube payload (that works specifically for Rest API requests) is a way for you to specify to Cube which columns you want and filtered by which value (properties from different cubes can be requested, provided that there is a [join](#joins) between them).

```js
{
    "query": {
        "dimensions": [
            "Unit.cUnitName",
            "UnitTypes.name",
            "Groups.name",
            "UnitTypes.bedBath",
            "UnitSpecsInfo.squareFootage",
            "Party.resident",
            "Renewals.marketRentAtSign",
            "Renewals.currentMarketRent",
            "Renewals.oldRent",
            "Renewals.newRent",
            "Renewals.netChange",
            "Renewals.percentChange",
            "Renewals.startDate",
            "Renewals.term",
            "Renewals.month",
            "Renewals.monthGroup"
        ],
        "timeDimensions": [],
        "order": {
            "Unit.cUnitName": "asc",
            "Renewals.marketRentAtSign": "desc"
        },
        "filters": [
            {
                "member": "Renewals.communityId",
                "operator": "equals",
                "values": [
                    "e8848f98-f3df-4d3e-88ce-ecd10f6fccd6"
                ]
            }
        ],
        "segments": [
            "Renewals.leaseExpirationSegment"
        ]
    }
}

```

## Cube properties

### Joins

The joins in Cube should preferably be done using the Cube infrastructure instead of the plain SQL. One of the reasons is that Cube can define which join will be actually needed when you a send the server a request for a specific dataset, which improves the query performance. It is always important to have one of your dimensions with the parameter `primaryKey: true` so that the table can be joined. You just have to specify joins in the schema and not in the payload (as stated previously, Cube does that for you depending on which columns you choose).

### Dimensions and measures

While joins are not required for a Cube, the dimensions and measures are, since Cube won't acknowledge a column unless it was stated in that stage. Dimensions should contain qualitative values (such as names, dates, or geographical data). Dimensions affect the level the Cube will be grouped by also. Measures contain numeric, quantitative values that you can measure. They can be counted, summed and/or be defined by a specific SQL function. Just keep in mind that in the Cube case, a sum/count can also be a dimension (if it was calculated previously in a CTE, before the end result). The parameters for measures can be checked [here](https://cube.dev/docs/schema/reference/measures) while the dimensions can be checked [here](https://cube.dev/docs/schema/reference/dimensions) - there's also one for the possible [types of measures and dimensions](https://cube.dev/docs/schema/reference/types-and-formats). They have to be specified both in the cube schema and in the cube payload.

### Segments

In Cube, you can filter whatever column you want in a payload (as long as this specific column can be joined with the other dimensions/measures you're asking for in the API request). But Cube also has a feature where you can pre-build filters, called segments. It has to be specified both in the cube schema and in the cube payload.

### Cube properties naming

Every cube property should be stated in Camel case. What that means is that the way Cube knows a variable contain multiple words is by the capital letters inside the variables name, and this will have an impact in how Cube reads the variables in the [cube playground](#cube-playground). So, instead of defining a dimension like this:

```js
      occupancyphaseindex: {
        sql: `occupancy_phase_index`,
        type: `string`
      },
```
Or like this:
```js
      occupancy_phase_index: {
        sql: `occupancy_phase_index`,
        type: `string`
      },
```

```js
The right way is this:
      occupancyPhaseIndex: {
        sql: `occupancy_phase_index`,
        type: `string`
      },
```


### Filters

As explained in the [segments](#segments) section, you can filter any column you want. All the possible different filter formats can be found [here](https://cube.dev/docs/query-format#filters-format). It has to be specified in the cube payload only.

### Data source

The dataSource property (which is usually stated at the end of a cube) defines from what database Cube will query from (in the cube configuration file, multiple databases can be specified, and they also can be joined, as stated [here](#joining-different-dbs).

### Other cube payload properties

There are also some other properties that can be specified to cube payloads. They can also be found [here](https://cube.dev/docs/query-format).

## Cube playground

Finally, Cube also offers a playground, with a wizard that can help with building both schemas and payloads. 

![Schema](https://i.imgur.com/ih1E1Jl.png)

In the Schema tab, Cube shows a list of all the tables contained in the default database connected, making it possible to create cube schemas automatically, without having to create a file from the ground.

![Schema-files](https://i.imgur.com/U2ekh5X.png)

There is also an option to see all the current schemas deployed in Cube (in a read-only mode).

![Build](https://i.imgur.com/NsMgE8d.png)

Finally, it also enables the creation of cube payloads automatically. You can select specifically which measures, dimensions, segments or filters you want in your payload and the query result can be displayed in different ways.

![aged-by-month-build](https://i.imgur.com/DojJVjv.png)

In this example some dimensions and filters were picked in the dropdown menu. If I click the run button, the query will be ran by Cube and I'll have the result in whatever format I want.

![aged-by-month-result](https://i.imgur.com/1olAQw7.png)

There are two other options in the sub menu located in the right center that are important for us. The **JSON Query** option shows the final payload that was generated by the Cube Playground and **SQL** option shows the query that was generated by the payload/schema.

# Cube.js company guidelines

## js files naming

There is an exception for the [staging layer](#staging-layer), but the naming convention when you create a schema should always be the exact same as the cube you are going to create. So, if you're going to create a cube called `Renewals`, just create a `Renewals.js` file and only include this cube inside it.

## Schemas layers

The Cube.js company infrastructure was thought out to have **three** different layers (which are separated as folders).The **raw** layer, the **staging** layer and the **business** layer.

![image](https://user-images.githubusercontent.com/90468226/185438349-328af6c8-a036-4765-a5e5-5dfeb2662b92.png)

### Raw layer

The raw layer is the base from which other cubes inherit characteristics. This layer should just contain only the Select to the tables from the database, without any modification (aside from any possible joins that the table could have and columns transformations that represent only that specific column). Keep in mind that cubes created both in the raw layer and in staging layer **should not** be called by payloads. Also, filters need to be avoided at this layer as they interfere with the pre-aggreations in the Business layer. 

Cube's name in this layer need to be prefixed with **raw_** 

Here is an example of a cube schema contained in the raw layer:

```js
cube(`raw_Occupancy`, {
  sql: `SELECT * FROM "leasing".occupancy`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Unit: {
      sql: `${Occupancy.unitId} = ${Unit.unitId}`,
      relationship: `belongsTo`
    },

    CALGrouped: {
      sql: `${Occupancy.unitId} = ${CALGrouped.locationId}`,
      relationship: `belongsTo`
    },

    VacateNotice: {
      sql: `${Occupancy.occupancyId} = ${VacateNotice.occupancyId} AND ${VacateNotice.canceledDate} IS NULL`,
      relationship: `belongsTo`
    },
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [occupancyId, customerId, businessUnitId, unitId, endDate, householdMoveInDate, householdMoveOutDate, startDate]
    }
  },
  
  dimensions: {
    occupancyId: {
      sql: `occupancy_id`,
      type: `string`,
      primaryKey: true
    },
    
    currentStatus: {
      sql: `current_status`,
      type: `string`
    },
    
    customerId: {
      sql: `customer_id`,
      type: `string`
    },
    
    businessUnitId: {
      sql: `business_unit_id`,
      type: `string`
    },
    
    unitId: {
      sql: `unit_id`,
      type: `string`
    },
    
    endDate: {
      sql: `end_date`,
      type: `time`
    },
    
    householdMoveInDate: {
      sql: `household_move_in_date`,
      type: `time`
    },
    
    householdMoveOutDate: {
      sql: `household_move_out_date`,
      type: `time`
    },
    
    startDate: {
      sql: `start_date`,
      type: `time`
    }
  },
  
  dataSource: `default`
});

```
If the schema was created through the Cube Playground, keep in mind that you have to add the parameter `primaryKey: true` to one of the columns if you want to define a join.

### Staging layer

The staging layer is the intermediate step between the Raw layer and the Business layer. Cubes created in the staging Layer will be grouped in a sub directory named **Staging**. This layer will contain all the logic comming from the original SQL with the exception of the filters.

The staging layer should contain any Common Table Expression (CTE) that may be used in a specific report, so instead of the final layer (business) being verbose, it's a better practice to separate them in to different layers. Here is an example of a CTE that had to be joined to the **Renewals** cube that is present in the Business Layer.

Cube's name in this layer need to be prefixed with **stg_**

example:

```js
cube(`stg_CALGroupedRenewals`, {
    sql: `
    SELECT 
        cal.location_id, 
        sum(price) amenities_amount,
        string_agg(a."name", ',') amenities_list
        FROM ${CommunityAmenitiesLocations.sql()} cal
        INNER JOIN ${CommunityAmenities.sql()} ca on cal.community_amenity_id = ca.id
        INNER JOIN ${Amenities.sql()} a on ca.amenity_id = a.id
    GROUP BY cal.location_id`,
    
    preAggregations: { 
    },
    
    joins: {
    },
    
    measures: {
    },
    
    dimensions: {
      locationId: {
        sql: `location_id`,
        type: `string`,
        primaryKey: true
      },
      
      amenitiesAmount: {
        sql: `amenities_amount`,
        type: `number`
      },

      amenitiesList: {
        sql: `amenities_list`,
        type: `string`
      },
    },
    
    dataSource: `default`
  });
```
Unfortunately, in this case, we can't join using the joins parameter from Cube, since this Cube won't be called directly by the payload, so that's the only case where this is done.

Sometimes an innter join is needed. In order to convert into a inner you need to create a segment where we "transform" all left joins in inner joins.
example:
```javascript
innerJoinSegment: {
      sql: `
      ${stg_CommunityIntent_vendor_name.customerId} IS NOT NULL
      AND ${stg_IntentResponse_vendor_name.idIntentResponse} IS NOT NULL
      AND ${stg_Intent_vendor_name.intentName} IS NOT NULL
      AND ${stg_Community_vendor_name.idCommunity} IS NOT NULL
      AND ${stg_Customer_vendor_name.idCustomer} IS NOT NULL`
  },
```

Although there are two different ways to define this cube schemas (keep in mind that this is specific to the staging layer), for usage and standarization purposes, we have to create a file per cube, as we do in the other layers. This has a better use when the specific staging cube can be used into different business cubes.
The other option would be creating a .js file containing all cube staging schemas (in the Renewals example, a RenewalsStaging.js file would be created) with the cubes containing a suffix regarding the report (so they aren't duplicated with any other report).

### Business layer

This is the final layer, and it should contain the actual reports/tables that will be called by the Cube API.

Cube's name in this layer need to be prefixed with **bus_**

```js
cube(`bus_Renewals`, {
    sql: `
    SELECT * FROM ${OccupancyPhase.sql()}`,
    
    preAggregations: {
      renewalsPre: {
        // external: true,
        dimensions: [ 
          Unit.cUnitName,
          UnitTypes.name,
          Groups.name,
          UnitTypes.bedBath,
          UnitSpecsInfo.squareFootage,
          Party.resident,
          Renewals.marketRentAtSign,
          Renewals.currentMarketRent,
          Renewals.oldRent,
          Renewals.newRent,
          Renewals.netChange,
          OccupancyPhase.currentRentAmount,
          Renewals.percentChange,
          Renewals.startDate,
          Renewals.term,
          Renewals.month,
          Renewals.monthGroup,
          Renewals.communityId],
       segments: [Renewals.leaseExpirationSegment],
    }
    },
    
    joins: {
  
      Occupancy: {
        sql: `${Renewals.occupancyId} = ${Occupancy.occupancyId}`,
        relationship: `belongsTo`
      },
  
      OccupancyRelationship: {
        sql: `${Renewals.occupancyId} = ${OccupancyRelationship.occupancyId} AND ${OccupancyRelationship.relationshipTypeName} = 'Resident'`,
        relationship: `belongsTo`
      },

      OccupancyPhase: {
        sql: `${Renewals.occupancyId} = ${OccupancyPhase.occupancyId} AND ${Renewals.occupancyPhaseIndex} - 1 = ${OccupancyPhase.occupancyPhaseIndex}`,
        relationship: `belongsTo`
      },
  
    },
    
    measures: {
    },
    
    dimensions: {
      occupancyId: {
        sql: `occupancy_id`,
        type: `string`,
        primaryKey: true,
        shown: true
      },

      occupancyPhaseIndex: {
        sql: `occupancy_phase_index`,
        type: `string`
      },

      occupancyPhaseType: {
        sql: `occupancy_phase_type`,
        type: `string`
      },
  
      marketRentAtSign: {
        sql: `(${Renewals}.total_amenity_amount_at_start + ${Renewals}.base_market_rent_rate_at_start)::numeric(10,2)`,
        type: `number`,
        title: `Market Rent at Sign`
      },

      currentMarketRent: {
        sql: `coalesce(${CALGrouped}.amenities_amount, 0) + ${UnitTypes}.current_base_rent`,
        type: `number`,
        title: `Current Market Rent`
      },

      oldRent: {
        sql: `(${Renewals}.total_amenity_amount_at_start + ${OccupancyPhase}.current_rent_amount)::numeric(10,2)`,
        type: `number`,
        title: `Old Rent`
      },

      newRent: {
        sql: `(${Renewals}.total_amenity_amount_at_start + ${Renewals}.current_rent_amount)::numeric(10,2)`,
        type: `number`,
        title: `New Rent`
      },

      netChange: {
        sql: `(${Renewals}.current_rent_amount - ${OccupancyPhase}.current_rent_amount)::numeric(10,2)`,
        type: `number`,
        title: `Net Change`
      },

      currentRentAmount: {
        sql: `${Renewals}.current_rent_amount::numeric(10, 2)`,
        type: `number`,
        title: `Net Change`
      },

      percentChange: {
        sql: `ROUND(((${Renewals}.current_rent_amount::numeric/NULLIF(${OccupancyPhase}.current_rent_amount::numeric, 0) * 100) - 100)::numeric, 2)`,
        type: `number`,
        title: `Percent Change`
      },
  
      startDate: {
        sql: `LOWER(${Renewals}.occupancy_phase_span)`,
        type: `time`,
        title: `Start Date`
      },

      currentLeaseExpirationDate: {
        sql: `current_lease_expiration_date`,
        type: `time`
      },

      term: {
        sql: `DATE_PART('years', AGE(${Renewals.currentLeaseExpirationDate} + 1, ${Renewals.startDate})) * 12 + DATE_PART('months', AGE(${Renewals.currentLeaseExpirationDate} + 1, ${Renewals.startDate}))`,
        type: `number`,
        title: `Term`
      },

      month: {
        sql: `CONCAT(DATE_PART('year', ${Renewals.startDate}),'/', date_part('month', ${Renewals.startDate}))`,
        type: `string`,
        title: `Month`
      },

      monthGroup: {
        sql: `
        CASE 
            WHEN DATE_PART('month', ${Renewals.startDate}) = DATE_PART('month', now()) THEN 'This Month'
            WHEN DATE_PART('month', ${Renewals.startDate}) = DATE_PART('month', now() - INTERVAL '1 months') THEN 'Last Month'
            WHEN DATE_PART('month', ${Renewals.startDate}) = DATE_PART('month', now() - INTERVAL '2 months') THEN 'Month Before Last'	
            else NULL 
        END`,
        type: `string`,
        title: `Month Group`
      },

      communityId: {
        sql: `business_unit_id`,
        type: `string`
      },

    },

    segments: {
        leaseExpirationSegment: {
            sql: `
            ${Renewals.startDate} BETWEEN DATE_TRUNC('month', now() - INTERVAL '11 months') AND DATE_TRUNC('month', now() + INTERVAL '1 months') - INTERVAL '1 days'
            and ${Renewals.occupancyPhaseType} = 'Renewal'`
        },
    },
    
    dataSource: `default`
  });
```
## Using Cube functions

Almost everything that can be done in Cube can also be done through default SQL, but it's a better idea to use the Cube functions everytime it is possible so that its flexibility is utilized. For instance, instead of defining all the columns in the SQL and then defining them in the **dimensions** parameter (which is required) like in this example:

```js
cube(`Amenities`, {
  sql: `SELECT description, created_by FROM amnt.amenities`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
  },
  
  dimensions: {
    description: {
      sql: `description`,
      type: `string`
    },
    
    createdBy: {
      sql: `created_by`,
      type: `string`
    },
...
```
We can do it like this:

```js
cube(`Amenities`, {
  sql: `SELECT * FROM amnt.amenities`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
  },
  
  dimensions: {
    description: {
      sql: `description`,
      type: `string`
    },
    
    createdBy: {
      sql: `created_by`,
      type: `string`
    },

```
Having the `SELECT ALL` in the Cube SQL allows us to easily define new dimensions, without including the column in two different places. Another example is the usage of **segments** parameter, which is like defining custom WHERE clauses and adds more flexibility to the Cube. For instance:

```js
cube(`Renewals`, {
    sql: `
    SELECT * FROM "leasing".occupancy_phase
    WHERE 
      LOWER(occupancy_phase_span) BETWEEN DATE_TRUNC('month', now() - INTERVAL '11
      months') AND DATE_TRUNC('month', now() + INTERVAL '1 months') - INTERVAL '1 days' AND occupancy_phase_type = 'Renewal'`,
...
    segments: {
    },
    dataSource: `default`
  });
});
```
Instead of building the Cube like this, a better option is:

```js
cube(`Renewals`, {
    sql: `
    SELECT * FROM ${OccupancyPhase.sql()}`,
...
    segments: {
        leaseExpirationSegment: {
            sql: `
            ${Renewals.startDate} BETWEEN DATE_TRUNC('month', now() - INTERVAL '11 months') AND DATE_TRUNC('month', now() + INTERVAL '1 months') - INTERVAL '1 days'
            and ${Renewals.occupancyPhaseType} = 'Renewal'`
        },
    },
    
    dataSource: `default`
  });
```
This enables you to only include the WHERE clause whenever you want easily (and other possible filters), including them in the Payload like this:

```js
{
    "dimensions": [
      "Renewals.unit",
    ],
    "segments": [
      "Renewals.leaseExpirationSegment"
    ]
  }
```
Also, in the second example the columns and tables are referenced as JS variables, which is explained in [this section](#using-cube-variables).

## Using Cube variables

The cube variables are simply ways to call a schema/column without having to rewrite them (as in the previous segments example). There are two main ways in which variables are being used currently:

```js
cube(`Renewals`, {
    sql: `
    SELECT * FROM ${OccupancyPhase.sql()}`,
...
```
If an already created raw cube needs to be used in a business cube, as in this example, the best practice to refer to it is using this notation. In that way, if for a specific reason the Occupancy Phase cube changes it's name, only a change in the original cube would be needed.

```js
...
    joins: {
  
      Occupancy: {
        sql: `${Renewals.occupancyId} = ${Occupancy.occupancyId}`,
        relationship: `belongsTo`
      },
  
      OccupancyRelationship: {
        sql: `${Renewals.occupancyId} = ${OccupancyRelationship.occupancyId} AND ${OccupancyRelationship.relationshipTypeName} = 'Resident'`,
        relationship: `belongsTo`
      },

      OccupancyPhase: {
        sql: `${Renewals.occupancyId} = ${OccupancyPhase.occupancyId} AND ${Renewals.occupancyPhaseIndex} - 1 = ${OccupancyPhase.occupancyPhaseIndex}`,
        relationship: `belongsTo`
      },
  
    },
...
```
When a column from a different table needs to be stated as in this join example, the best practice would be to relate to them as in the example above (`${CubeSchemaName.dimensionName}`). In that way, if a dimension ever changes name in the original SQL, it would only needed to be changed in one place.

## Do not redefine properties

This is a straight forward practice. Let's say the Renewals report need the `unit_id` column from the Occupancy cube. So, instead of adding the dimension to the Renewals cube like this:

Cube schema:
```js
    unitId: {
      sql: `${Occupancy.unitId}`,
      type: `string`
    },
```

Cube payload:
```js
{
    "dimensions": [
      "Renewals.occupancyPhaseIndex",
      "Renewals.unitId"
    ]
...
```
A better practice to do it would be just adding the dimension referred from the Occupancy table directly in to the cube payload like the following:

Cube payload:
```js
{
    "dimensions": [
      "Renewals.occupancyPhaseIndex",
      "Occupancy.unitId"
    ]
...
```
In that way, we keep the schemas leaner and also more welcoming to new changes.

# Cube advanced concepts

While Cube is a beginner friendly tool, it also has some advanced concepts that helps when dealing with more advanced cubes/front end applications.

## Title and description parameters

You can define a specific title (which would be different than the variable you create in the schema and relate to in the payload) and a description for every dimension created. These changes come in the end of the API response, and they are helpful when you may want to add more documentation to your cubes.

## Join flow

Cube has some pecularities regarding the way you should create the joins between your reports (which is not stated in their official docs). Take, for instance, the original SQL for the Renewals report:

```sql
select 
u.c_unit_name as unit,
ut."name" as unit_type,
g."name" as amenity_group,
concat(ut.bedroom_num, '/', ut.bathroom_num ) as bed_bath,
usi.square_footage as sqft,
concat(p.c_given_name, ' ', p.c_family_name ) as resident,
op.total_amenity_amount_at_start::money + op.base_market_rent_rate_at_start as market_rent_at_sign, 
ut.current_base_rent + coalesce(a.amenities_amount,0) as current_market_rent,
op.total_amenity_amount_at_start + op_prev.current_rent_amount as old_rent,
op.total_amenity_amount_at_start + op.current_rent_amount as new_rent,
op.current_rent_amount - op_prev.current_rent_amount as net_change,
round(((op.current_rent_amount/op_prev.current_rent_amount  * 100)-100)::numeric,2) as percentage_change,
lower(op.occupancy_phase_span) start_date,
date_part('years', age(op.current_lease_expiration_date+1, lower(op.occupancy_phase_span)))*12+date_part('months', age(op.current_lease_expiration_date +1, lower(op.occupancy_phase_span))) term,
concat(date_part('year', lower(op.occupancy_phase_span)),'/', date_part('month', lower(op.occupancy_phase_span))) as "month",
case 
	when date_part('month', lower(op.occupancy_phase_span)) = date_part('month', now()) then 'This Month'
	when date_part('month', lower(op.occupancy_phase_span)) = date_part('month', now() - interval '1 months') then 'Last Month'
	when date_part('month', lower(op.occupancy_phase_span)) = date_part('month', now() - interval '2 months') then 'Month Before Last'	
	else '' end as month_group
from leasing.occupancy_phase op 
	left join leasing.occupancy o on op.occupancy_id = o.occupancy_id 
	left join leasing.unit u on o.unit_id = u.unit_id 
	left join leasing.occupancy_relationship or2 on o.occupancy_id = or2.occupancy_id and or2.relationship_type_name = 'Resident'
	left join leasing.party p on or2.party_id = p.party_id
	left join cbr.unit_specs_info usi on CAST(LPAD(TO_HEX(cast(usi.unit_id as bigint)), 32, '0') as uuid) = u.unit_id
	left join cbr.unit_types ut on usi.unit_type_id = ut.id and ut.deleted_at is null
	left join leasing.occupancy_phase op_prev on op.occupancy_id = op_prev.occupancy_id and op.occupancy_phase_index - 1 = op_prev.occupancy_phase_index 
	left join (select cal.location_id, sum(price) amenities_amount
				from amnt.community_amenities_locations cal
				         join amnt.community_amenities ca on cal.community_amenity_id = ca.id
				         join amnt.amenities a on ca.amenity_id = a.id
				group by cal.location_id) a on o.unit_id = a.location_id
	left join amnt.community_groups_locations cgl on u.unit_id = cgl.location_id 
	left join amnt.community_groups cg on cgl.community_group_id = cg.id
	left join amnt.groups g on cg.group_id = g.id
where lower(op.occupancy_phase_span) between date_trunc('month', now() - interval '11 months') and date_trunc('month', now() + interval '1 months') - interval '1 days'
and op.business_unit_id = 'e8848f98-f3df-4d3e-88ce-ecd10f6fccd6' /* param1 */
and op.occupancy_phase_type = 'Renewal'
order by 1
```
The intuitive idea would be, when converting it into a cube schema/payload, to create all joins inside the Renewals report, as in this example:

```js
cube(`Renewals`, {
    sql: `
    SELECT * FROM ${OccupancyPhase.sql()}`,
    
    preAggregations: {
    },
    
    joins: {
  
      Occupancy: {
        sql: `${Renewals.occupancyId} = ${Occupancy.occupancyId}`,
        relationship: `belongsTo`
      },

      Unit: {
      sql: `${Occupancy.unitId} = ${Unit.unitId}`,
      relationship: `belongsTo`
      },    
      
      OccupancyRelationship: {
        sql: `${Renewals.occupancyId} = ${OccupancyRelationship.occupancyId} AND ${OccupancyRelationship.relationshipTypeName} = 'Resident'`,
        relationship: `belongsTo`
      },

      Party: {
      sql: `${OccupancyRelationship}.party_id = ${Party}.party_id`,
      relationship: `belongsTo`
      }
...
```
The reason why that won't work with Cube is that it will try to join the cubes in the order which you call the columns, and not in the order that the joins are actually defined in the report, which will probably result in an error. What you actually should do is to make the joins be "hierarchical" based on which table it uses to join. In the example, if you look at the SQL report, the occupancy_phase is the tables that initiates the query, so it is simulates as "Renewals table". Every cube that comes from a different cube should be stated in that join. 

```sql
from leasing.occupancy_phase op
left join leasing.occupancy o on op.occupancy_id = o.occupancy_id 
```
For instance, the occupancy table is joining the occupancy phase, so no issue there.

```sql
from leasing.occupancy_phase op
left join leasing.occupancy o on op.occupancy_id = o.occupancy_id 
left join leasing.unit u on o.unit_id = u.unit_id 
```
Now in this case, the unit is being joined by the occupancy table, so it should be joining the occupancy cube instead, as it is right here:

```sql
cube(`Occupancy`, {
  sql: `SELECT * FROM "leasing".occupancy`,
  
  preAggregations: {
  },
  
  joins: {
    Unit: {
      sql: `${Occupancy.unitId} = ${Unit.unitId}`,
      relationship: `belongsTo`
    },
...
```
This type of join flow is better also because if a report is pretty similar to another, it isn't necessary to state the joins all over again, since they are done mostly in the [raw schemas](#raw-layer).

### Join limitations

Cube has some limitations regarding the join feature. The first one being that instead of using subqueries, it is needed that you use CTEs. The reason is that every possible join should happen in Cube's join syntax instead of using join using text. Here is an example for that:

```sql
SELECT c.account_id, 
  b.customer_id, 
    b.business_unit_id,
  b.bill_id, 
  b.post_date,
  SUM(bi.amount) AS "bill_items_sum",
  (
    SELECT SUM(ci.amount) 
    FROM pmsaccounting.credit_item ci 
    LEFT JOIN pmsaccounting.void_credit_item vci ON vci.credit_item_id = ci.credit_item_id 
    WHERE ci.bill_id = b.bill_id AND vci.void_credit_item_id IS NULL
  ) AS "credit_items_sum"
FROM pmsaccounting.charge c 
LEFT JOIN pmsaccounting.bill_item bi ON bi.bill_item_id = c.bill_item_id
LEFT JOIN pmsaccounting.bill b ON b.bill_id = bi.bill_id
WHERE b.post_date <= '2023-01-01'::timestamp
GROUP BY b.bill_id, c.account_id, b.customer_id, b.business_unit_id, b.post_date
```

The construction of the column `credit_items_sum` needs to be reworked to something like this:

```sql
    WITH credit_sum AS (
        SELECT bill_id, 
        SUM(ci.amount) AS "credit_amount" 
        FROM pmsaccounting.credit_item ci 
        LEFT JOIN pmsaccounting.void_credit_item vci ON vci.credit_item_id = ci.credit_item_id 
        WHERE vci.void_credit_item_id IS NULL
        GROUP BY 1
    )
	SELECT c.account_id, 
		b.customer_id, 
  		b.business_unit_id,
		b.bill_id, 
		b.post_date,
		SUM(bi.amount) AS "bill_items_sum",
		SUM("credit_amount") AS "credit_items_sum"
	FROM pmsaccounting.charge c 
	LEFT JOIN pmsaccounting.bill_item bi ON bi.bill_item_id = c.bill_item_id
	LEFT JOIN pmsaccounting.bill b ON b.bill_id = bi.bill_id
    LEFT JOIN credit_sum ci ON b.bill_id = ci.bill_id
	WHERE b.post_date <= '2023-01-01'::timestamp
	GROUP BY b.bill_id, c.account_id, b.customer_id, b.business_unit_id, b.post_date
    ORDER BY b.bill_id, c.account_id, b.customer_id, b.business_unit_id, b.post_date;
```

## Pre-aggregations

Cube has a powerful way to cache query results, so instead of you having to re run the query against the database everytime you change a specific filter, Cube saves the result in a parquet file and the API request hits this file instead of the database itself (if every field is contained in the pre aggregation). 

```js
cube(`Renewals`, {
    sql: `
    SELECT * FROM ${OccupancyPhase.sql()}`,
    
    preAggregations: {
      renewalsPre: {
        external: true,
        dimensions: [ 
          Unit.cUnitName,
          UnitTypes.name,
          Groups.name,
          UnitTypes.bedBath,
          UnitSpecsInfo.squareFootage,
          Party.resident,
          Renewals.marketRentAtSign,
          Renewals.currentMarketRent,
          Renewals.oldRent,
          Renewals.newRent,
          Renewals.netChange,
          OccupancyPhase.currentRentAmount,
          Renewals.percentChange,
          Renewals.startDate,
          Renewals.term,
          Renewals.month,
          Renewals.monthGroup,
          Renewals.communityId],
       segments: [Renewals.leaseExpirationSegment],
    }
    },
```
This is an example notation of a pre aggregation. Keep in mind you can create multiple pre aggregations for each cube, and they will be returned depending on which columns you specified in the payload.

```js
{
    "query": {
        "dimensions": [
            "Unit.cUnitName",
            "UnitTypes.name",
            "Groups.name",
            "UnitTypes.bedBath",
            "UnitSpecsInfo.squareFootage",
            "Party.resident",
            "Renewals.marketRentAtSign",
            "Renewals.currentMarketRent",
            "Renewals.oldRent",
            "Renewals.newRent",
            "Renewals.netChange",
            "Renewals.percentChange",
            "Renewals.startDate",
            "Renewals.term",
            "Renewals.month",
            "Renewals.monthGroup"
        ],
        "timeDimensions": [],
        "order": {
            "Unit.cUnitName": "asc",
            "Renewals.marketRentAtSign": "desc"
        },
        "filters": [
            {
                "member": "Renewals.communityId",
                "operator": "equals",
                "values": [
                    "e8848f98-f3df-4d3e-88ce-ecd10f6fccd6"
                ]
            }
        ],
        "segments": [
            "Renewals.leaseExpirationSegment"
        ]
    }
}
```
Since I want to create a pre-aggregation for this specific payload, **all** properties present in the payload (dimensions, segments, order, filter...) were stated in the pre-aggregation previously shown. Some important parameters to be used:

- type: the default value for it is rollUp, but it can also be defined as a rollupJoin, which will be explained later in [here](#joining-different-dbs).
- measure, dimensions, segments: simply the what will be included in the pre aggregation (keep in mind that if just one field isn't specified there, the pre aggregation won't be called in the request).
- refreshKey: this field allows for a sql and an every key. The SQL can be a `SELECT MAX(created_at) FROM orders`, which means that the pre aggregation will be refreshed everytime a table is refreshed. the every key can be defined as descriptive values such as **1 hour**, **1 day** but also as cron jobs (they can be also used together, as it is stated in [this](https://cube.dev/docs/schema/reference/pre-aggregations#parameters-refresh-key) example).
- external: it always have to be defined as true.
- indexes: it can be used to improve the performance of the pre aggregations and is also used to join pre aggregations
- rollups: used for specifying which pre aggregations will be joined (used for type rollupJoin)

## Joining different DBs

If you want to join one cube that comes from different data sources, Cube provides a way where you can join different pre aggregations. Cube has a pretty dense documentation regarding it [here](https://cube.dev/docs/caching/using-pre-aggregations#joins-between-pre-aggregations), but simplifying it, what needs to be done is:

- Both cubes that will be joined need to have a pre aggregation with the type rollup (indicating they are a default pre aggregation) - with every column that needs to be contained in the final payload. The only additional thing is that an index parameter needs to be added to every pre aggregation, containing the field(s) that will be responsible for joining the cubes.
- Then you define a join between two cubes, as you would do normally for cubes that are contained in the same data source.
- Finally, you create a final pre aggregation with the type rollupJoin containing all the properties from previous pre aggregations and which rollups are going to be joined in the rollups parameter

## Filter parameters

The [default filters](#filters) from Cube work in a simple maner, it creates a where at the end of the SQL statement. But usually in CTEs there are some cases where you want to filter some values previously based on the user input, and there's where filter parameters come in handy. 

```sql
WITH cacelled_orders AS (
  SELECT
    order_id,
    cancelled_date
  FROM orders
  WHERE order_date < '2022-01-01'
)
SELECT 
  * 
FROM cancelled_orders 
```
Let's say that you want to filter both the `cancelled_date` field and the `order_date` (but you can't bring this field to the final SQL). What you would do is use this exact SQL to create a Cube and use the filter parameters functionality, and this is how it works:

```js
cube(`CancelledOrders`, {
    sql: `      
WITH cacelled_orders AS (
  SELECT
    order_id,
    cancelled_date
  FROM orders
  WHERE order_date < FILTER_PARAMS.CancelledOrders.cancelledDate.filter((value) => `order_date < ${value}`)}
)
SELECT 
  * 
FROM cancelled_orders`,

dimensions: {
      cancelledDate: {
        sql: `cancelled_date`,
        type: `time`
      },
}
...
```
In that way, everytime the canceledDate field is filtered, the order_date will be filtered by the same date. This is the syntax of the function:

```
FILTER_PARAMS.CubeName.fieldName.filter((value) => `sql_field = ${value}`)}
```

Keep in mind you can also use filter parameters with filters that are being used for a before and an after date at the same time, for example. For it to work just replace the value parameter with two parameters, for instance, from and to.

But there are also some cases where you just want to filter the order_date, so how can we avoid Cube filtering the cancelledDate field? The solution for it is to create a dummy date at the final SQL that would not impact the SQL result with whatever value you used to filter it, like in this example:

```js
cube(`CancelledOrders`, {
    sql: `      
WITH cacelled_orders AS (
  SELECT
    order_id,
    cancelled_date
  FROM orders
  WHERE order_date < FILTER_PARAMS.CancelledOrders.dummyDateBefore.filter((value) => `order_date < ${value}`)}
)
SELECT 
  *,
  '1900-01-01'::date AS dummy_date_before,
FROM cancelled_orders`,

dimensions: {
      dummyDateBefore: {
        sql: `dummy_date_before`,
        type: `time`
      },
}
...
```

And in the final payload you'd just specify the date with a before filter, so it would always try to only bring rows with a date before of the one you specify, which would always be true for the `1900-01-01`dummy date:

```js
{
    "query": {
        "dimensions": [
            "CancelledOrders.order_id",
            "CancelledOrders.cancelled_date"
        ],
        },
        "filters": [
            {
                "member": "CancelledOrders.dummyDateBefore",
                "operator": "before",
                "values": [
                    "1900-01-01"
                ]
            }
        ]
    }
}
```

# Help sources

A good part of this guide was based on the [Cube dev official guide](https://cube.dev/docs), so feel free to check it out if you want to look at some examples or more detailed guidelines. Also, if you have additional questions you can reach them at [Github](https://github.com/cube-js/cube.js/issues) and at their [Slack channel](https://cubejs-community.herokuapp.com/).

# FAQ
