### SkyWave 9: Updates
How many towers received software updates?

Submit the flag as `flag{number}`. Example: `flag{10}`.

---

#### SQL Query Counting Distinct Entries

After logging into the SQL instance, we list the columns of the `Tower_Maintenance` Table:

```SQL
MySQL [cell_tower_db]> SELECT column_name FROM INFORMATION_SCHEMA.columns WHERE table_name = 'Tower_Maintenance';
```

Next list the distinct `maintenance_type` values:

```SQL
MySQL [cell_tower_db]> SELECT DISTINCT maintenance_type FROM Tower_Maintenance;
```

We filter the `Tower_Maintenance` table to include only rows where the value of `maintenance_type` is a software update. Next we count the distinct `tower_id` values, since towers that have had multiple software updates should only be counted once.:

```SQL
MySQL [cell_tower_db]> SELECT COUNT(*) FROM (SELECT DISTINCT tower_id FROM Tower_Maintenance WHERE maintenance_type = 'Software updates') AS distinct_tower_ids;
```

---

#### Flag
> flag{70}

We find that there a 70 towers that have had software updates.

---