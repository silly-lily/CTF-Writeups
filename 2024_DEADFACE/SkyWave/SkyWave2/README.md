### SkyWave 2: Trifecta
We can assume that d34th used some kind of smart device or computer to conduct his attacks. 
How many devices in the database are either a smart phone, a computer, or a tablet?

Submit the flag as `flag{number}`. Example: `flag{10}`.

---

### SQL Cross Table Query

After logging into the SQL instance, we list all the tables in the database:

```SQL
MySQL [cell_tower_db]> SHOW Tables;
```

Next We look at the columns of the `Device` and `Device_Types` tables:

```SQL
MySQL [cell_tower_db]> SELECT column_name FROM information_schema.columns where table_name = 'Devices';
MySQL [cell_tower_db]> SELECT column_name FROM information_schema.columns where table_name = 'Device_Types';
```

We retrieve the `device_type_id` of smartphones, computers, and tablets from the `Device_Types` table:

```SQL
MySQL [cell_tower_db]>  SELECT device_type_id FROM Device_Types WHERE device_type_name IN ('smartphone','computer','tablet');
```

Next we count the number of rows in the `Devices` table where the `device_type_id` matches one of those devices:

```SQL
MySQL [cell_tower_db]> SELECT COUNT(*) FROM Devices WHERE device_type_id IN (1,3,4);
```

---

#### Flag
> flag{714}

We find that there are 714 matching devices.

---