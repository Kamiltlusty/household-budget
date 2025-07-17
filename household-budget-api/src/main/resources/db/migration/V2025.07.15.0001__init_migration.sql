CREATE TABLE form
(
    form_id     BIGINT GENERATED ALWAYS AS IDENTITY,
    date        date NOT NULL,
    buyer_name  VARCHAR(255) NOT NULL,
    receipt_url VARCHAR(255),
    total_sum   DECIMAL(10, 2) NOT NULL,
    store_id    BIGINT NOT NULL,
    CONSTRAINT pk_form PRIMARY KEY (form_id)
);

CREATE TABLE product
(
    product_id BIGINT GENERATED ALWAYS AS IDENTITY,
    name       VARCHAR(255) NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY (product_id)
);

CREATE TABLE product_form
(
    form_id    BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    CONSTRAINT pk_product_form PRIMARY KEY (form_id, product_id)
);

CREATE TABLE store
(
    store_id BIGINT GENERATED ALWAYS AS IDENTITY,
    name     VARCHAR(255) NOT NULL,
    CONSTRAINT pk_store PRIMARY KEY (store_id)
);

ALTER TABLE form
    ADD CONSTRAINT fk_store_id FOREIGN KEY (store_id) REFERENCES store (store_id);

ALTER TABLE product_form
    ADD CONSTRAINT fk_form_id FOREIGN KEY (form_id) REFERENCES form (form_id);

ALTER TABLE product_form
    ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES product (product_id);