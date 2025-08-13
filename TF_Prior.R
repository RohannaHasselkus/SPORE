# ======================================================
# Memory-Safe A. nidulans PANDA TF Prior Construction
# ======================================================

if (!requireNamespace("BiocManager", quietly = TRUE))
  install.packages("BiocManager")

BiocManager::install(c("rtracklayer"), ask = FALSE)
install.packages(c("dplyr"))

library(rtracklayer)
library(dplyr)

# ==== 1. File paths ====
gff_path <- "/Users/rohannahasselkus/Desktop/Comp Bio Proj/Fungi_Network/Aspergillus_nidulans.ASM1142v1.59.gff3"

# ==== 2. Load GFF3 ====
cat("📂 Loading GFF3...\n")
gff <- import(gff_path)
genes <- gff[gff$type == "gene"]

# ==== 3. Identify transcription factors (improved) ====
gene_meta <- as.data.frame(mcols(genes))
all_annotations <- apply(gene_meta, 1, function(x) paste(x, collapse = " "))

tf_mask <- grepl("transcription factor", all_annotations, ignore.case = TRUE) |
  grepl("\\bTF\\b", all_annotations, ignore.case = TRUE) |
  grepl("GO:0003700", all_annotations, ignore.case = TRUE)

tf_ids <- mcols(genes)$ID[tf_mask]
tf_ids <- tf_ids[!is.na(tf_ids)]
all_gene_ids <- mcols(genes)$ID
target_ids <- setdiff(all_gene_ids, tf_ids)

if (length(tf_ids) == 0) {
  stop("❌ No transcription factors found. Consider adding an external TF list.")
}

# ==== 4. Build sparse TF-target edge list ====
cat("🛠 Building sparse TF-target prior...\n")
edges <- expand.grid(TF = tf_ids, Target = target_ids, stringsAsFactors = FALSE)
edges$Weight <- 1

# ==== 5. Save PANDA prior as edge list ====
output_file <- "A_nidulans_TF_prior_panda.txt"
write.table(edges, file = output_file, sep = "\t", quote = FALSE, row.names = FALSE, col.names = TRUE)

# ==== 6. Summary ====
cat("\n✅ Saved PANDA prior to", output_file, "\n")
cat("TFs detected:", length(tf_ids), "\n")
cat("Targets:", length(target_ids), "\n")
cat("Total edges:", nrow(edges), "\n")
cat("Preview:\n")
print(head(edges, 20))
