CREATE TABLE `trades` (
	`id` text PRIMARY KEY NOT NULL,
	`maker` text NOT NULL,
	`maker_name` text NOT NULL,
	`offer` integer NOT NULL,
	`want` integer NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`taker` text,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE TRIGGER trade_reserve BEFORE INSERT ON trades BEGIN
 SELECT CASE WHEN COALESCE((SELECT json_extract(data, '$.owned."' || NEW.offer || '"') - (SELECT count(*) FROM json_each(records.data,'$.deck') WHERE value=NEW.offer) FROM records WHERE id='user:'||NEW.maker),0)<1 THEN RAISE(ABORT,'spare copy required') END;
 UPDATE records SET data=json_set(data,'$.owned."'||NEW.offer||'"',json_extract(data,'$.owned."'||NEW.offer||'"')-1),version=version+1 WHERE id='user:'||NEW.maker;
END;
--> statement-breakpoint
CREATE TRIGGER trade_check_accept BEFORE UPDATE OF status ON trades WHEN OLD.status='open' AND NEW.status='accepted' BEGIN
 SELECT CASE WHEN NEW.taker IS NULL OR NEW.taker=OLD.maker THEN RAISE(ABORT,'invalid trader') END;
 SELECT CASE WHEN COALESCE((SELECT json_extract(data, '$.owned."' || OLD.want || '"') - (SELECT count(*) FROM json_each(records.data,'$.deck') WHERE value=OLD.want) FROM records WHERE id='user:'||NEW.taker),0)<1 THEN RAISE(ABORT,'spare copy required') END;
END;
--> statement-breakpoint
CREATE TRIGGER trade_exchange AFTER UPDATE OF status ON trades WHEN OLD.status='open' AND NEW.status='accepted' BEGIN
 UPDATE records SET data=json_set(data,'$.owned."'||OLD.want||'"',COALESCE(json_extract(data,'$.owned."'||OLD.want||'"'),0)+1),version=version+1 WHERE id='user:'||OLD.maker;
 UPDATE records SET data=json_set(data,'$.owned."'||OLD.want||'"',json_extract(data,'$.owned."'||OLD.want||'"')-1,'$.owned."'||OLD.offer||'"',COALESCE(json_extract(data,'$.owned."'||OLD.offer||'"'),0)+1),version=version+1 WHERE id='user:'||NEW.taker;
END;
--> statement-breakpoint
CREATE TRIGGER trade_cancel AFTER UPDATE OF status ON trades WHEN OLD.status='open' AND NEW.status='cancelled' BEGIN
 UPDATE records SET data=json_set(data,'$.owned."'||OLD.offer||'"',COALESCE(json_extract(data,'$.owned."'||OLD.offer||'"'),0)+1),version=version+1 WHERE id='user:'||OLD.maker;
END;
