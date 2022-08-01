### SkyWave 1: High Tower
What is the tower_id of the cell tower that sits at an approximate elevation of 220 ft?

Submit the flag as `flag{tower_id}`. Example: `flag{10}`.

---

#### SQL Query

After logging into the SQL instance using SSH, we locate the table that contains the `tower_id` and `elevation` columns:

```SQL
MySQL [cell_tower_db]> SELECT table_name FROM INFORMATION_SCHEMA.columns WHERE column_name = 'tower_id';
MySQL [cell_tower_db]> SELECT table_name FROM INFORMATION_SCHEMA.columns WHERE column_name = 'elevation';
```

Next, we search the table for a row where the elevation is 220 and extract the `tower_id` from that row:

```SQL
MySQL [cell_tower_db]> SELECT tower_id, elevation FROM Towers WHERE ROUND(elevation) = 220;
```

---

#### Flag
> flag{215}

We find that the `tower_id` for that row is 215.

---