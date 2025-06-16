-- CreateTable
CREATE TABLE "client_anonymous" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_seen_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_anonymous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_list" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "source" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "client_anonymous_id" TEXT,

    CONSTRAINT "shopping_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit" TEXT,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "list_id" TEXT NOT NULL,

    CONSTRAINT "shopping_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shopping_list_client_anonymous_id_idx" ON "shopping_list"("client_anonymous_id");

-- CreateIndex
CREATE INDEX "shopping_list_deleted_at_idx" ON "shopping_list"("deleted_at");

-- CreateIndex
CREATE INDEX "shopping_item_name_idx" ON "shopping_item"("name");

-- CreateIndex
CREATE INDEX "shopping_item_checked_idx" ON "shopping_item"("checked");

-- AddForeignKey
ALTER TABLE "shopping_list" ADD CONSTRAINT "shopping_list_client_anonymous_id_fkey" FOREIGN KEY ("client_anonymous_id") REFERENCES "client_anonymous"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_item" ADD CONSTRAINT "shopping_item_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "shopping_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
