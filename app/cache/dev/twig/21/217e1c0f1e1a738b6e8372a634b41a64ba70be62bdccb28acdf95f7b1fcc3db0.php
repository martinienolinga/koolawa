<?php

/* @Framework/Form/choice_attributes.html.php */
class __TwigTemplate_dcbaeb16ac7565b8ef217bfd50168e4e2381d409f49a86b0637539f35fb87cbb extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_a40aea915aae19bc417dfd365c9a5a6af30fa9d1a0cd8a8f5dfbd270a8d355d6 = $this->env->getExtension("native_profiler");
        $__internal_a40aea915aae19bc417dfd365c9a5a6af30fa9d1a0cd8a8f5dfbd270a8d355d6->enter($__internal_a40aea915aae19bc417dfd365c9a5a6af30fa9d1a0cd8a8f5dfbd270a8d355d6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/choice_attributes.html.php"));

        // line 1
        echo "id=\"<?php echo \$view->escape(\$id) ?>\" name=\"<?php echo \$view->escape(\$full_name) ?>\"
<?php if (\$disabled): ?>disabled=\"disabled\" <?php endif ?>
<?php foreach (\$choice_attr as \$k => \$v): ?>
<?php if (\$v === true): ?>
<?php printf('%s=\"%s\" ', \$view->escape(\$k), \$view->escape(\$k)) ?>
<?php elseif (\$v !== false): ?>
<?php printf('%s=\"%s\" ', \$view->escape(\$k), \$view->escape(\$v)) ?>
<?php endif ?>
<?php endforeach ?>
";
        
        $__internal_a40aea915aae19bc417dfd365c9a5a6af30fa9d1a0cd8a8f5dfbd270a8d355d6->leave($__internal_a40aea915aae19bc417dfd365c9a5a6af30fa9d1a0cd8a8f5dfbd270a8d355d6_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/choice_attributes.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* id="<?php echo $view->escape($id) ?>" name="<?php echo $view->escape($full_name) ?>"*/
/* <?php if ($disabled): ?>disabled="disabled" <?php endif ?>*/
/* <?php foreach ($choice_attr as $k => $v): ?>*/
/* <?php if ($v === true): ?>*/
/* <?php printf('%s="%s" ', $view->escape($k), $view->escape($k)) ?>*/
/* <?php elseif ($v !== false): ?>*/
/* <?php printf('%s="%s" ', $view->escape($k), $view->escape($v)) ?>*/
/* <?php endif ?>*/
/* <?php endforeach ?>*/
/* */
